import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../App.css"; 

// Import React Quill agar tampilan 100% sama dengan Admin
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; 

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  image_url: string;
  meta_title?: string;
  meta_desc?: string;
}

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post) {
      document.title = post.meta_title || post.title;
      let metaDescTag = document.querySelector("meta[name='description']");
      if (!metaDescTag) {
        metaDescTag = document.createElement('meta');
        metaDescTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescTag);
      }
      metaDescTag.setAttribute('content', post.meta_desc || "Artikel Blog Pranoova");
    }
    return () => {
        document.title = "Pranoova Digital Suite";
    };
  }, [post]);

  if (!post) {
    return <div className="text-center py-20">Loading...</div>;
  }

  // Config agar toolbar TIDAK MUNCUL di mode baca
  const modules = {
    toolbar: false 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/blog")}
          className="mb-6 hover:bg-gray-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Blog
        </Button>

        <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 max-w-4xl mx-auto">
          {post.image_url && (
            <div className="w-full h-64 md:h-96 overflow-hidden">
               <img 
                src={post.image_url} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="border-t pt-8">
                {/* SOLUSI FINAL: Gunakan ReactQuill mode readOnly.
                    Class 'view-mode' akan kita pakai di CSS untuk hilangkan border kotak. 
                */}
                <ReactQuill
                    value={post.content}
                    readOnly={true}
                    theme="snow"
                    modules={modules}
                    className="view-mode"
                />
            </div>

          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;