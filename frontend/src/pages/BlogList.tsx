import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; 

interface BlogPost {
  ID: number;
  title: string;
  content: string;
  image: string;
  CreatedAt: string;
}

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/blogs")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(err => console.error("Gagal ambil data:", err));
  }, []);

  return (
    <div className="container mx-auto py-10 px-4 mt-20">
      <h1 className="text-4xl font-bold text-center mb-10">Artikel & Berita</h1>
      
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">Belum ada artikel.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.ID} className="flex flex-col h-full hover:shadow-lg transition-shadow">
              {post.image && (
                <div className="w-full h-48 overflow-hidden rounded-t-xl bg-gray-100">
                   <img 
                     src={`http://localhost:8080/${post.image}`} 
                     alt={post.title} 
                     className="w-full h-full object-cover"
                   />
                </div>
              )}
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">
                    {new Date(post.CreatedAt).toLocaleDateString("id-ID")}
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="line-clamp-3 text-muted-foreground text-sm">
                  {post.content}
                </p>
                <Link to={`/blog/${post.ID}`}>
                    <Button variant="link" className="px-0 mt-4 text-primary">Baca Selengkapnya &rarr;</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;