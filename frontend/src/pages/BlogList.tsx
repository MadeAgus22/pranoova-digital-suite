import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;     
  image_url: string;
  meta_desc?: string;
}

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (response.ok) {
          const data = await response.json();
          // PERBAIKAN: Gunakan || []
          setPosts(data || []); 
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const getExcerpt = (htmlContent: string, length: number = 100) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Artikel</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Wawasan terbaru seputar teknologi, transformasi digital, dan pengembangan bisnis.
          </p>
        </div>

        {loading ? (
           <div className="text-center py-20 text-gray-500">Memuat artikel...</div>
        ) : posts.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
              <h3 className="text-lg font-medium text-gray-900">Belum ada artikel</h3>
              <p className="text-gray-500 mt-1">Silakan tambahkan artikel melalui dashboard admin.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden h-full">
                
                <div className="h-48 overflow-hidden bg-gray-200">
                  {post.image_url ? (
                     <img 
                      src={post.image_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                     />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                     </div>
                  )}
                </div>

                <CardHeader>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                       <User className="h-3 w-3" />
                       {post.author}
                    </span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2 hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <CardDescription className="line-clamp-3">
                    {post.meta_desc ? post.meta_desc : getExcerpt(post.content, 120)}
                  </CardDescription>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Button asChild variant="link" className="px-0 text-blue-600 font-semibold group">
                    <Link to={`/blog/${post.id}`}>
                      Baca Selengkapnya 
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogList;