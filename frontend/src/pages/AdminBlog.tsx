import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react"; // Install lucide-react jika belum

interface BlogPost {
  ID: number;
  title: string;
}

const AdminBlog = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [activeTab, setActiveTab] = useState(token ? "list" : "login");
  
  // State Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // State CRUD
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  
  // State Form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // FETCH DATA
  const fetchPosts = () => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => setPosts(data));
  };

  useEffect(() => {
    if (token) fetchPosts();
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setActiveTab("list");
      fetchPosts();
      toast.success("Login Berhasil!");
    } else {
      toast.error("Login Gagal");
    }
  };

  const handleEdit = (post: any) => {
    setEditId(post.ID);
    setTitle(post.title);
    setContent(post.content);
    setFile(null); // Gambar tidak wajib diubah
    setActiveTab("create"); // Pindah ke tab form
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus artikel ini?")) return;
    const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Berhasil dihapus");
      fetchPosts();
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("image", file);

    const url = editId 
      ? `/api/blogs/${editId}` // URL UPDATE
      : "/api/blogs";          // URL CREATE
    
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: formData });
      if (res.ok) {
        toast.success(editId ? "Artikel Diupdate!" : "Artikel Dipublish!");
        setTitle(""); setContent(""); setFile(null); setEditId(null);
        setActiveTab("list");
        fetchPosts();
      }
    } catch (error) {
      toast.error("Gagal menyimpan");
    }
  };

  // TAMPILAN LOGIN
  if (!token) {
    return (
      <div className="container mx-auto py-20 px-4 max-w-md">
        <Card>
          <CardHeader><CardTitle>Admin Login</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
              <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <Button type="submit" className="w-full">Masuk</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
        <Button variant="destructive" onClick={() => { setToken(""); localStorage.removeItem("token"); }}>Logout</Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="list">Daftar Artikel</TabsTrigger>
          <TabsTrigger value="create" onClick={() => { setEditId(null); setTitle(""); setContent(""); }}>
            {editId ? "Edit Artikel" : "Tulis Baru"}
          </TabsTrigger>
        </TabsList>

        {/* TAB LIST */}
        <TabsContent value="list">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.ID}>
                      <TableCell>{post.title}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                          <Pencil className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(post.ID)}>
                          <Trash2 className="w-4 h-4 mr-1" /> Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB FORM */}
        <TabsContent value="create">
          <Card>
            <CardHeader><CardTitle>{editId ? "Edit Artikel" : "Konten Baru"}</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handlePost} className="space-y-4">
                <Input placeholder="Judul" value={title} onChange={e => setTitle(e.target.value)} required />
                <Textarea placeholder="Isi..." className="min-h-[200px]" value={content} onChange={e => setContent(e.target.value)} required />
                <Input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
                <Button type="submit">{editId ? "Simpan Perubahan" : "Publish Sekarang"}</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminBlog;