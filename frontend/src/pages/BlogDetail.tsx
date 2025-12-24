import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BlogPost {
  ID: number;
  title: string;
  content: string;
  image: string;
  CreatedAt: string;
}

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!post) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Link to="/blog">
        <Button variant="ghost" className="mb-4">&larr; Kembali ke Blog</Button>
      </Link>
      
      {post.image && (
        <img 
          src={`http://localhost:8080/${post.image}`} 
          alt={post.title} 
          className="w-full h-[400px] object-cover rounded-xl mb-8 shadow-lg"
        />
      )}
      
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-muted-foreground mb-8 text-sm">
        Diposting pada: {new Date(post.CreatedAt).toLocaleDateString("id-ID")}
      </p>
      
      <div className="prose max-w-none text-lg leading-relaxed whitespace-pre-line">
        {post.content}
      </div>
    </div>
  );
};

export default BlogDetail;