import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { 
  Trash2, Edit, Plus, ArrowLeft, LogOut, Users, Search,
  Bold, Italic, Underline, List, ListOrdered, Image as ImageIcon, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify 
} from "lucide-react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// --- CONFIG API ---
const BASE_URL = "http://localhost:8080"; 
const API_URL = `${BASE_URL}/api/blogs`;
const LOGIN_URL = `${BASE_URL}/api/login`;
const USERS_URL = `${BASE_URL}/api/users`;
const UPLOAD_URL = `${BASE_URL}/api/upload`;

// --- TYPES ---
interface BlogPost {
  id: number; title: string; author: string; date: string; content: string; image_url: string; 
  meta_title?: string; meta_desc?: string; meta_keywords?: string;
}
interface UserData { id: number; username: string; role: string; password?: string; }

// --- TOOLBAR ---
const CustomToolbar = () => (
    <div id="toolbar" className="flex flex-wrap gap-1 py-3 px-4 border-b border-gray-200 sticky top-20 z-40 bg-white/95 backdrop-blur shadow-sm rounded-t-lg transition-all items-center">
       <TooltipProvider delayDuration={0}>
          <span className="ql-formats"><select className="ql-size" defaultValue=""><option value="small"></option><option value=""></option><option value="large"></option><option value="huge"></option></select></span>
          <span className="ql-formats"><button className="ql-bold"><Bold className="w-4 h-4"/></button><button className="ql-italic"><Italic className="w-4 h-4"/></button><button className="ql-underline"><Underline className="w-4 h-4"/></button></span>
          <span className="ql-formats"><button className="ql-list" value="ordered"><ListOrdered className="w-4 h-4"/></button><button className="ql-list" value="bullet"><List className="w-4 h-4"/></button></span>
          <span className="ql-formats"><button className="ql-image"><ImageIcon className="w-4 h-4"/></button></span>
       </TooltipProvider>
    </div>
);
const modules = { toolbar: { container: "#toolbar" } };
const formats = ['header', 'size', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'align', 'link', 'image'];

const AdminBlog = () => {
  // AUTH
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState("user");
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState<"blog" | "users">("blog");
  const navigate = useNavigate();
  const { toast } = useToast();

  // BLOG STATE
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // SEO STATE
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [metaKeywords, setMetaKeywords] = useState(""); 

  // LOGIC STATE (PERBAIKAN DISINI)
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // State baru untuk Mode Tambah
  const [currentId, setCurrentId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // USER MANAGEMENT STATE
  const [users, setUsers] = useState<UserData[]>([]);
  const [manageUsername, setManageUsername] = useState("");
  const [managePassword, setManagePassword] = useState("");
  const [manageRole, setManageRole] = useState("user");
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setIsAuthenticated(true);
      setCurrentUserRole(role || "user");
      fetchPosts();
      if (role === "admin") fetchUsers();
    }
  }, []);

  // --- AUTH ACTIONS ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUser, password: loginPass })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        setIsAuthenticated(true);
        setCurrentUserRole(data.role);
        fetchPosts();
        if (data.role === "admin") fetchUsers();
        toast({ title: "Login Berhasil" });
      } else toast({ title: "Gagal Login", variant: "destructive" });
    } catch { toast({ title: "Error Connection", variant: "destructive" }); } 
    finally { setLoginLoading(false); }
  };

  const handleLogout = () => { if (confirm("Keluar?")) { localStorage.clear(); setIsAuthenticated(false); navigate("/"); } };

  // --- DATA FETCH ---
  const fetchPosts = async () => { try { const res = await fetch(API_URL); if (res.ok) setPosts(await res.json() || []); } catch (e) { console.error(e); } };
  const fetchUsers = async () => { try { const token = localStorage.getItem("token"); const res = await fetch(USERS_URL, { headers: { "Authorization": `Bearer ${token}` } }); if (res.ok) setUsers(await res.json() || []); } catch (e) { console.error(e); } };

  // --- BLOG ACTIONS ---
  // Tombol Tambah Blog (PERBAIKAN)
  const handleStartCreate = () => {
      resetBlogForm();
      setIsCreating(true); // Aktifkan mode create
      setIsEditing(false); // Pastikan bukan edit
  };

  const handleStartEdit = (p: BlogPost) => {
      setTitle(p.title); setAuthor(p.author); setContent(p.content); setImageUrl(p.image_url);
      setMetaTitle(p.meta_title||""); setMetaDesc(p.meta_desc||""); setMetaKeywords(p.meta_keywords||"");
      setIsEditing(true); // Aktifkan mode edit
      setIsCreating(false);
      setCurrentId(p.id);
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      
      // LOGIC TOMBOL SIMPAN (PERBAIKAN)
      // Jika isEditing = true -> PUT (Update)
      // Jika isCreating = true -> POST (Create)
      const url = isEditing ? `${API_URL}/${currentId}` : API_URL;
      const method = isEditing ? "PUT" : "POST";
      
      const body = JSON.stringify({ 
          title, author, content, image_url: imageUrl, 
          meta_title: metaTitle || title, 
          meta_desc: metaDesc,
          meta_keywords: metaKeywords 
      });
      
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }, body });
      if (res.ok) { 
          toast({ title: isEditing ? "Artikel Diupdate" : "Artikel Dibuat" }); 
          resetBlogForm(); 
          fetchPosts(); 
      } 
      else toast({ title: "Gagal", variant: "destructive" });
  };

  const deleteBlog = async (id: number) => {
      if (!confirm("Hapus?")) return;
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
      fetchPosts();
  };

  const resetBlogForm = () => {
      setTitle(""); setAuthor(""); setContent(""); setImageUrl(""); setMetaTitle(""); setMetaDesc(""); setMetaKeywords("");
      setIsEditing(false); setIsCreating(false); setCurrentId(null);
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; if (!file) return;
      const fd = new FormData(); fd.append("file", file);
      const token = localStorage.getItem("token");
      const res = await fetch(UPLOAD_URL, { method: "POST", headers: { "Authorization": `Bearer ${token}` }, body: fd });
      if (res.ok) { const data = await res.json(); setImageUrl(data.url); }
  };

  // --- USER ACTIONS ---
  const handleUserSubmit = async (e: React.FormEvent) => {
      e.preventDefault(); const token = localStorage.getItem("token");
      const url = isEditingUser ? `${USERS_URL}/${currentUserId}` : USERS_URL;
      const method = isEditingUser ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify({ username: manageUsername, password: managePassword, role: manageRole }) });
      if (res.ok) { toast({ title: "Sukses" }); resetUserForm(); fetchUsers(); } else toast({ title: "Gagal", variant: "destructive" });
  };
  const deleteUser = async (id: number) => { if (!confirm("Hapus?")) return; const token = localStorage.getItem("token"); await fetch(`${USERS_URL}/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } }); fetchUsers(); };
  const editUser = (u: UserData) => { setManageUsername(u.username); setManageRole(u.role); setManagePassword(""); setIsEditingUser(true); setCurrentUserId(u.id); };
  const resetUserForm = () => { setManageUsername(""); setManagePassword(""); setManageRole("user"); setIsEditingUser(false); setCurrentUserId(null); };

  if (!isAuthenticated) return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4"><Card className="w-full max-w-md"><CardHeader className="text-center"><CardTitle>Admin Login</CardTitle></CardHeader><CardContent><form onSubmit={handleLogin} className="space-y-4"><div className="space-y-2"><Label>Username</Label><Input value={loginUser} onChange={e=>setLoginUser(e.target.value)}/></div><div className="space-y-2"><Label>Password</Label><Input type="password" value={loginPass} onChange={e=>setLoginPass(e.target.value)}/></div><Button type="submit" className="w-full" disabled={loginLoading}>Masuk</Button></form></CardContent></Card></div>
  );

  const showBlogForm = isEditing || isCreating; // Tampilkan form jika Edit ATAU Create

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in max-w-7xl">
       <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-4">
              {!showBlogForm && (
                  <div className="bg-gray-100 p-1 rounded-lg flex">
                      <button onClick={() => setActiveTab("blog")} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab==="blog"?"bg-white shadow text-blue-600":"text-gray-500 hover:text-gray-700"}`}>Kelola Blog</button>
                      {currentUserRole === "admin" && (<button onClick={() => setActiveTab("users")} className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex gap-2 items-center ${activeTab==="users"?"bg-white shadow text-blue-600":"text-gray-500 hover:text-gray-700"}`}><Users className="h-4 w-4" /> Kelola User</button>)}
                  </div>
              )}
              {/* TOMBOL TAMBAH BLOG (FIXED) */}
              {!showBlogForm && activeTab === "blog" && <Button onClick={handleStartCreate}><Plus className="mr-2 h-4 w-4"/> Tambah Blog</Button>}
              <Button variant="destructive" onClick={handleLogout}><LogOut className="h-4 w-4"/></Button>
          </div>
       </div>

       {activeTab === "blog" && (
           <>
             {showBlogForm ? (
                 <Card className="border-none shadow-none bg-transparent">
                     {/* Sticky Header Action */}
                     <div className="flex justify-between items-center mb-6 border-b pb-4 sticky top-0 bg-white/80 backdrop-blur z-50 py-2">
                        <Button variant="ghost" onClick={resetBlogForm}><ArrowLeft className="mr-2 h-4 w-4" /> Kembali</Button>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={resetBlogForm}>Batal</Button>
                            {/* TOMBOL AKSI OTOMATIS BERUBAH */}
                            <Button onClick={handleBlogSubmit} className={isEditing ? "bg-orange-600 hover:bg-orange-700" : "bg-blue-600 hover:bg-blue-700"}>
                                {isEditing ? "Update Perubahan" : "Publish Artikel"}
                            </Button>
                        </div>
                     </div>
                     
                     <CardContent className="px-0 space-y-8">
                         <div>
                             <Input 
                                value={title} 
                                onChange={e=>setTitle(e.target.value)} 
                                placeholder="Judul Artikel Anda..." 
                                className="text-5xl font-extrabold tracking-tight border-none focus-visible:ring-0 px-0 py-8 h-auto placeholder:text-gray-300 text-gray-900" 
                                required 
                             />
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                             <div className="space-y-4"><Label>Penulis</Label><Input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Nama Penulis"/></div>
                             <div className="space-y-4"><Label>Cover Image</Label><Input type="file" onChange={uploadImage} /></div>
                         </div>
                         
                         <div className="space-y-2">
                            <Label className="text-lg font-semibold text-gray-700">Konten Artikel</Label>
                            <div className="bg-white rounded-lg border shadow-sm overflow-visible relative min-h-[500px]"><CustomToolbar /><ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} formats={formats} className="p-4" placeholder="Mulai menulis cerita..."/></div>
                         </div>

                         <div className="pt-8 border-t border-gray-200">
                             <div className="flex items-center gap-2 mb-6">
                                <Search className="w-6 h-6 text-blue-600" />
                                <h3 className="text-2xl font-bold text-gray-800">Optimasi SEO</h3>
                             </div>
                             
                             <div className="grid grid-cols-1 gap-6 p-8 bg-slate-50 rounded-xl border border-slate-200">
                                 <div>
                                     <Label className="font-semibold text-gray-700">Meta Title (Judul di Google)</Label>
                                     <Input value={metaTitle} onChange={e=>setMetaTitle(e.target.value)} placeholder="Contoh: Cara Sukses Bisnis Online 2024" className="mt-2 bg-white border-slate-300" />
                                 </div>
                                 <div>
                                     <Label className="font-semibold text-gray-700">Kata Kunci (Keywords)</Label>
                                     <Input value={metaKeywords} onChange={e=>setMetaKeywords(e.target.value)} placeholder="Contoh: bisnis, online, umkm, sukses (pisahkan dengan koma)" className="mt-2 bg-white border-slate-300" />
                                 </div>
                                 <div>
                                     <Label className="font-semibold text-gray-700">Meta Description</Label>
                                     <Textarea value={metaDesc} onChange={e=>setMetaDesc(e.target.value)} placeholder="Deskripsi singkat..." className="mt-2 bg-white border-slate-300 h-24 resize-none" />
                                 </div>
                             </div>
                         </div>
                     </CardContent>
                 </Card>
             ) : (
                 <Card>
                     <CardHeader><CardTitle>Daftar Artikel</CardTitle></CardHeader>
                     <CardContent>
                         <Table>
                             <TableHeader><TableRow><TableHead>Judul</TableHead><TableHead>Penulis</TableHead><TableHead>Aksi</TableHead></TableRow></TableHeader>
                             <TableBody>{posts.map(p=>(
                                 <TableRow key={p.id}>
                                     <TableCell className="font-medium py-4 text-lg">{p.title}</TableCell><TableCell>{p.author}</TableCell>
                                     <TableCell className="space-x-2">
                                         <Button variant="ghost" size="icon" onClick={()=>handleStartEdit(p)}><Edit className="h-4 w-4 text-blue-500"/></Button>
                                         <Button variant="ghost" size="icon" onClick={()=>deleteBlog(p.id)}><Trash2 className="h-4 w-4 text-red-500"/></Button>
                                     </TableCell>
                                 </TableRow>
                             ))}{posts.length===0&&<TableRow><TableCell colSpan={3} className="text-center py-8 text-gray-400">Belum ada data</TableCell></TableRow>}</TableBody>
                         </Table>
                     </CardContent>
                 </Card>
             )}
           </>
       )}

       {activeTab === "users" && currentUserRole === "admin" && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <Card className="h-fit"><CardHeader><CardTitle>{isEditingUser?"Edit":"Tambah"} User</CardTitle></CardHeader><CardContent><form onSubmit={handleUserSubmit} className="space-y-4"><Input value={manageUsername} onChange={e=>setManageUsername(e.target.value)} placeholder="Username"/><Input type="password" value={managePassword} onChange={e=>setManagePassword(e.target.value)} placeholder="Password"/><Select value={manageRole} onValueChange={setManageRole}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="user">User</SelectItem><SelectItem value="admin">Admin</SelectItem></SelectContent></Select><div className="flex gap-2">{isEditingUser&&<Button type="button" variant="outline" onClick={resetUserForm} className="flex-1">Batal</Button>}<Button type="submit" className="flex-1">Simpan</Button></div></form></CardContent></Card>
               <Card className="md:col-span-2"><CardHeader><CardTitle>List User</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Username</TableHead><TableHead>Role</TableHead><TableHead>Aksi</TableHead></TableRow></TableHeader><TableBody>{users.map(u=>(<TableRow key={u.id}><TableCell>{u.username}</TableCell><TableCell><span className={`px-2 py-1 rounded text-xs font-bold ${u.role==='admin'?'bg-red-100 text-red-700':'bg-blue-100 text-blue-700'}`}>{u.role.toUpperCase()}</span></TableCell><TableCell className="space-x-2"><Button variant="ghost" size="icon" onClick={()=>editUser(u)}><Edit className="h-4 w-4 text-blue-500"/></Button><Button variant="ghost" size="icon" onClick={()=>deleteUser(u.id)} disabled={u.id===1}><Trash2 className="h-4 w-4 text-red-500"/></Button></TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
           </div>
       )}
    </div>
  );
};

export default AdminBlog;