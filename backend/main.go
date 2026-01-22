package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp" // PENTING: Untuk membersihkan slug
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	_ "modernc.org/sqlite"
)

// Variabel Global
var jwtKey []byte
var db *sql.DB

// --- STRUCTS ---
type Claims struct {
	Username string `json:"username"`
	Role     string `json:"role"`
	jwt.RegisteredClaims
}

type Blog struct {
	ID           int    `json:"id"`
	Title        string `json:"title"`
	Slug         string `json:"slug"` // TAMBAHAN: Slug untuk URL SEO
	Author       string `json:"author"`
	Date         string `json:"date"`
	Content      string `json:"content"`
	ImageURL     string `json:"image_url"`
	MetaTitle    string `json:"meta_title"`
	MetaDesc     string `json:"meta_desc"`
	MetaKeywords string `json:"meta_keywords"`
}

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password,omitempty"`
	Role     string `json:"role"`
}

// --- HELPER FUNCTION: Make Slug ---
func makeSlug(title string) string {
	// Ubah ke huruf kecil
	slug := strings.ToLower(title)
	// Ganti spasi dengan strip
	slug = strings.ReplaceAll(slug, " ", "-")
	// Hapus karakter selain huruf, angka, dan strip
	reg, _ := regexp.Compile("[^a-z0-9-]+")
	slug = reg.ReplaceAllString(slug, "")
	return slug
}

// --- DATABASE INIT ---
func initDB() {
	var err error
	// Menggunakan database pranoova2.db
	db, err = sql.Open("sqlite", "./pranoova2.db")
	if err != nil {
		log.Fatal(err)
	}

	// 1. Tabel Blogs (Update: tambah kolom slug jika belum ada)
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT, 
        slug TEXT UNIQUE, 
        author TEXT, date TEXT, content TEXT, 
        image_url TEXT, meta_title TEXT, meta_desc TEXT, meta_keywords TEXT
    );`)
	if err != nil {
		log.Fatal(err)
	}

	// --- AUTO MIGRATION: Fix Database Lama ---
	// Coba tambahkan kolom slug (jika error berarti sudah ada, abaikan)
	db.Exec("ALTER TABLE blogs ADD COLUMN slug TEXT")

	// Isi slug untuk artikel lama yang masih kosong
	rows, _ := db.Query("SELECT id, title FROM blogs WHERE slug IS NULL OR slug = ''")
	if rows != nil {
		updates := make(map[int]string)
		var id int
		var title string
		for rows.Next() {
			rows.Scan(&id, &title)
			updates[id] = makeSlug(title)
		}
		rows.Close()

		for id, slug := range updates {
			// Tambahkan unique timestamp jika slug duplikat (opsional tapi aman)
			db.Exec("UPDATE blogs SET slug = ? WHERE id = ?", slug, id)
			fmt.Printf("Migrasi: Blog ID %d updated ke slug '%s'\n", id, slug)
		}
	}
	// --- END MIGRATION ---

	// 2. Tabel Users
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'user'
    );`)
	if err != nil {
		log.Fatal(err)
	}

	createDefaultAdmin()
}

func createDefaultAdmin() {
	var count int
	db.QueryRow("SELECT count(*) FROM users").Scan(&count)

	if count == 0 {
		hash, _ := bcrypt.GenerateFromPassword([]byte("password123"), bcrypt.DefaultCost)
		_, err := db.Exec("INSERT INTO users(username, password, role) VALUES(?, ?, ?)", "admin", string(hash), "admin")
		if err != nil {
			log.Println("Gagal membuat user default:", err)
		} else {
			log.Println("User default dibuat: admin / password123 (Role: admin)")
		}
	} else {
		// Pastikan admin punya role yang benar
		db.Exec("UPDATE users SET role='admin' WHERE username='admin' AND (role IS NULL OR role = '')")
	}
}

// --- AUTH HANDLERS ---
func loginHandler(w http.ResponseWriter, r *http.Request) {
	var creds User
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid request body", 400)
		return
	}

	var user User
	err := db.QueryRow("SELECT id, username, password, role FROM users WHERE username = ?", creds.Username).
		Scan(&user.ID, &user.Username, &user.Password, &user.Role)

	if err != nil {
		http.Error(w, "User tidak ditemukan", 401)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password)); err != nil {
		http.Error(w, "Password salah", 401)
		return
	}

	// JWT V5 Claims
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Username: user.Username,
		Role:     user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		http.Error(w, "Gagal membuat token", 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token": tokenString,
		"role":  user.Role,
	})
}

// --- USER HANDLERS ---
func getUsers(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, username, role FROM users ORDER BY id ASC")
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var u User
		rows.Scan(&u.ID, &u.Username, &u.Role)
		users = append(users, u)
	}
	w.Header().Set("Content-Type", "application/json")
	if users == nil {
		w.Write([]byte("[]"))
	} else {
		json.NewEncoder(w).Encode(users)
	}
}

func createUser(w http.ResponseWriter, r *http.Request) {
	var u User
	json.NewDecoder(r.Body).Decode(&u)
	hashed, _ := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if u.Role == "" {
		u.Role = "user"
	}
	_, err := db.Exec("INSERT INTO users(username, password, role) VALUES(?, ?, ?)", u.Username, string(hashed), u.Role)
	if err != nil {
		http.Error(w, "Username sudah ada", 409)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User created"})
}

func updateUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var u User
	json.NewDecoder(r.Body).Decode(&u)
	if u.Password != "" {
		hashed, _ := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
		db.Exec("UPDATE users SET username=?, password=?, role=? WHERE id=?", u.Username, string(hashed), u.Role, vars["id"])
	} else {
		db.Exec("UPDATE users SET username=?, role=? WHERE id=?", u.Username, u.Role, vars["id"])
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "User updated"})
}

func deleteUser(w http.ResponseWriter, r *http.Request) {
	if mux.Vars(r)["id"] == "1" {
		http.Error(w, "Cannot delete super admin", 403)
		return
	}
	db.Exec("DELETE FROM users WHERE id=?", mux.Vars(r)["id"])
	json.NewEncoder(w).Encode(map[string]string{"message": "User deleted"})
}

// --- BLOG HANDLERS ---
func getBlogs(w http.ResponseWriter, r *http.Request) {
	// Ambil slug juga
	rows, _ := db.Query("SELECT id, title, slug, author, date, content, image_url, COALESCE(meta_title, ''), COALESCE(meta_desc, ''), COALESCE(meta_keywords, '') FROM blogs ORDER BY id DESC")
	defer rows.Close()
	var blogs []Blog
	for rows.Next() {
		var b Blog
		// Scan slug
		rows.Scan(&b.ID, &b.Title, &b.Slug, &b.Author, &b.Date, &b.Content, &b.ImageURL, &b.MetaTitle, &b.MetaDesc, &b.MetaKeywords)
		blogs = append(blogs, b)
	}
	w.Header().Set("Content-Type", "application/json")
	if blogs == nil {
		w.Write([]byte("[]"))
	} else {
		json.NewEncoder(w).Encode(blogs)
	}
}

func getBlog(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	slug := vars["id"] // URL parameter adalah {id}, tapi kita anggap sebagai slug/id

	var b Blog
	// Cari berdasarkan SLUG
	err := db.QueryRow("SELECT id, title, slug, author, date, content, image_url, COALESCE(meta_title, ''), COALESCE(meta_desc, ''), COALESCE(meta_keywords, '') FROM blogs WHERE slug = ?", slug).
		Scan(&b.ID, &b.Title, &b.Slug, &b.Author, &b.Date, &b.Content, &b.ImageURL, &b.MetaTitle, &b.MetaDesc, &b.MetaKeywords)

	if err != nil {
		// Fallback: Jika gagal cari slug, coba cari by ID (jaga-jaga)
		err = db.QueryRow("SELECT id, title, slug, author, date, content, image_url, COALESCE(meta_title, ''), COALESCE(meta_desc, ''), COALESCE(meta_keywords, '') FROM blogs WHERE id = ?", slug).
			Scan(&b.ID, &b.Title, &b.Slug, &b.Author, &b.Date, &b.Content, &b.ImageURL, &b.MetaTitle, &b.MetaDesc, &b.MetaKeywords)

		if err != nil {
			http.Error(w, "Blog Not Found", 404)
			return
		}
	}
	json.NewEncoder(w).Encode(b)
}

func createBlog(w http.ResponseWriter, r *http.Request) {
	var b Blog
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		http.Error(w, "Data tidak valid", 400)
		return
	}

	b.Date = time.Now().Format("2006-01-02")
	// Generate Slug
	b.Slug = makeSlug(b.Title)

	// Insert dengan Slug
	res, err := db.Exec("INSERT INTO blogs(title, slug, author, date, content, image_url, meta_title, meta_desc, meta_keywords) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
		b.Title, b.Slug, b.Author, b.Date, b.Content, b.ImageURL, b.MetaTitle, b.MetaDesc, b.MetaKeywords)

	if err != nil {
		log.Println("ERROR DATABASE:", err)
		http.Error(w, "Gagal simpan (Mungkin judul/slug duplikat): "+err.Error(), 500)
		return
	}

	id, _ := res.LastInsertId()
	b.ID = int(id)
	json.NewEncoder(w).Encode(b)
}

func updateBlog(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var b Blog
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		http.Error(w, "Data tidak valid", 400)
		return
	}

	// Update Slug juga jika judul berubah
	b.Slug = makeSlug(b.Title)

	_, err := db.Exec("UPDATE blogs SET title=?, slug=?, author=?, content=?, image_url=?, meta_title=?, meta_desc=?, meta_keywords=? WHERE id=?",
		b.Title, b.Slug, b.Author, b.Content, b.ImageURL, b.MetaTitle, b.MetaDesc, b.MetaKeywords, vars["id"])

	if err != nil {
		log.Println("ERROR UPDATE:", err)
		http.Error(w, "Gagal update: "+err.Error(), 500)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Updated"})
}

func deleteBlog(w http.ResponseWriter, r *http.Request) {
	db.Exec("DELETE FROM blogs WHERE id=?", mux.Vars(r)["id"])
	json.NewEncoder(w).Encode(map[string]string{"message": "Deleted"})
}

func uploadHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(10 << 20) // Max 10MB
	file, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Error retrieving file", 400)
		return
	}
	defer file.Close()

	// Pastikan folder uploads ada
	os.MkdirAll("uploads", 0755)

	filename := fmt.Sprintf("%d_%s", time.Now().Unix(), handler.Filename)
	dstPath := filepath.Join("uploads", filename)

	dst, err := os.Create(dstPath)
	if err != nil {
		http.Error(w, "Error saving file", 500)
		return
	}
	defer dst.Close()

	io.Copy(dst, file)

	// Return URL RELATIF (Tanpa localhost, agar aman di server)
	json.NewEncoder(w).Encode(map[string]string{"url": "/uploads/" + filename})
}

// --- MIDDLEWARE ---
func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("Authorization")
		if len(tokenString) > 7 && strings.ToUpper(tokenString[0:6]) == "BEARER" {
			tokenString = tokenString[7:]
		}

		claims := &Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Unauthorized", 401)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// --- MAIN FUNCTION ---
func main() {
	// Load .env
	err := godotenv.Load()
	if err != nil {
		log.Println("Note: .env tidak ditemukan, menggunakan environment sistem.")
	}

	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Println("PERINGATAN: JWT_SECRET default digunakan.")
		jwtKey = []byte("default_rahasia_jgn_dipakai_prod")
	} else {
		jwtKey = []byte(secret)
	}

	initDB()
	defer db.Close()

	// Pastikan folder upload ada
	if _, err := os.Stat("uploads"); os.IsNotExist(err) {
		os.Mkdir("uploads", 0755)
	}

	r := mux.NewRouter()

	// --- ROUTES ---
	// Public
	r.HandleFunc("/api/login", loginHandler).Methods("POST")
	r.HandleFunc("/api/blogs", getBlogs).Methods("GET")
	r.HandleFunc("/api/blogs/{id}", getBlog).Methods("GET") // ID di sini bisa berupa SLUG
	r.PathPrefix("/uploads/").Handler(http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads"))))

	// Protected (Butuh Login)
	api := r.PathPrefix("/api").Subrouter()
	api.Use(authMiddleware)

	api.HandleFunc("/blogs", createBlog).Methods("POST")
	api.HandleFunc("/blogs/{id}", updateBlog).Methods("PUT")
	api.HandleFunc("/blogs/{id}", deleteBlog).Methods("DELETE")
	api.HandleFunc("/upload", uploadHandler).Methods("POST")

	api.HandleFunc("/users", getUsers).Methods("GET")
	api.HandleFunc("/users", createUser).Methods("POST")
	api.HandleFunc("/users/{id}", updateUser).Methods("PUT")
	api.HandleFunc("/users/{id}", deleteUser).Methods("DELETE")

	// CORS
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"*"}) // Boleh diubah ke domain spesifik untuk keamanan
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"})

	fmt.Println("Server running at port 8080")
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(originsOk, headersOk, methodsOk)(r)))
}
