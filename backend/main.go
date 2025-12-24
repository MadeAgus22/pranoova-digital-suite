package main

import (
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/glebarez/sqlite"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// --- 1. CONFIG & MODELS ---
var db *gorm.DB
var secretKey = []byte("RAHASIA_SUPER_AMAN_GANTI_INI")

type BlogPost struct {
	gorm.Model
	Title   string `json:"title"`
	Content string `json:"content"`
	Image   string `json:"image"`
}

type User struct {
	gorm.Model
	Username string `gorm:"unique"`
	Password string
}

// --- 2. SETUP DATABASE ---
func initDB() {
	var err error
	db, err = gorm.Open(sqlite.Open("pranoova.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Gagal connect DB:", err)
	}
	db.AutoMigrate(&BlogPost{}, &User{})

	var count int64
	db.Model(&User{}).Count(&count)
	if count == 0 {
		hash, _ := bcrypt.GenerateFromPassword([]byte("password123"), 14)
		db.Create(&User{Username: "admin", Password: string(hash)})
	}
}

// --- 3. HANDLERS ---
func loginHandler(c *gin.Context) {
	var input struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Input salah"})
		return
	}
	var user User
	if err := db.Where("username = ?", input.Username).First(&user).Error; err != nil {
		c.JSON(401, gin.H{"error": "User tidak ditemukan"})
		return
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(401, gin.H{"error": "Password salah"})
		return
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})
	tokenString, _ := token.SignedString(secretKey)
	c.JSON(200, gin.H{"token": tokenString})
}

// GET ALL
func getBlogs(c *gin.Context) {
	var posts []BlogPost
	db.Order("created_at desc").Find(&posts)
	c.JSON(200, posts)
}

// GET ONE (DETAIL)
func getBlogByID(c *gin.Context) {
	var post BlogPost
	if err := db.First(&post, c.Param("id")).Error; err != nil {
		c.JSON(404, gin.H{"error": "Blog not found"})
		return
	}
	c.JSON(200, post)
}

// CREATE
func createBlog(c *gin.Context) {
	file, err := c.FormFile("image")
	filename := ""
	if err == nil && file != nil {
		os.MkdirAll("uploads", os.ModePerm) // Pastikan folder ada
		filename = "uploads/" + filepath.Base(file.Filename)
		c.SaveUploadedFile(file, filename)
	}
	post := BlogPost{
		Title:   c.PostForm("title"),
		Content: c.PostForm("content"),
		Image:   filename,
	}
	db.Create(&post)
	c.JSON(200, post)
}

// UPDATE (EDIT)
func updateBlog(c *gin.Context) {
	var post BlogPost
	if err := db.First(&post, c.Param("id")).Error; err != nil {
		c.JSON(404, gin.H{"error": "Blog not found"})
		return
	}

	// Update Text
	post.Title = c.PostForm("title")
	post.Content = c.PostForm("content")

	// Cek Gambar Baru
	file, err := c.FormFile("image")
	if err == nil && file != nil {
		// Hapus gambar lama jika perlu (opsional)
		filename := "uploads/" + filepath.Base(file.Filename)
		c.SaveUploadedFile(file, filename)
		post.Image = filename
	}

	db.Save(&post)
	c.JSON(200, post)
}

// DELETE (HAPUS)
func deleteBlog(c *gin.Context) {
	if err := db.Delete(&BlogPost{}, c.Param("id")).Error; err != nil {
		c.JSON(500, gin.H{"error": "Gagal hapus"})
		return
	}
	c.JSON(200, gin.H{"message": "Berhasil dihapus"})
}

func main() {
	initDB()
	r := gin.Default()

	// SETUP CORS LENGKAP
	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	r.Static("/uploads", "./uploads")

	// Routes
	r.POST("/api/login", loginHandler)
	r.GET("/api/blogs", getBlogs)
	r.GET("/api/blogs/:id", getBlogByID) // Route Baru Detail
	r.POST("/api/blogs", createBlog)
	r.PUT("/api/blogs/:id", updateBlog)    // Route Baru Edit
	r.DELETE("/api/blogs/:id", deleteBlog) // Route Baru Hapus

	log.Println("Server running on :8080")
	r.Run(":8080")
}
