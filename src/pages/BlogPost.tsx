import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import BlogHeader from "@/components/blog/BlogHeader";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PostData {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, content, excerpt, cover_image_url, created_at")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (data) setPost(data);
      setIsLoading(false);
    };
    if (slug) fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <h1 className="font-display text-4xl">Post não encontrado</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao blog
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      {post.cover_image_url && (
        <div className="w-full h-[400px] mt-20">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao blog
        </Button>

        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <Calendar className="w-4 h-4" />
          <time>{format(new Date(post.created_at), "dd 'de' MMMM, yyyy", { locale: ptBR })}</time>
        </div>

        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8">
          {post.title}
        </h1>

        <div
          className="prose prose-lg max-w-none text-foreground/80
            [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:font-display [&_h3]:text-2xl [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:mb-4 [&_p]:leading-relaxed
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
            [&_li]:mb-2
            [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
            [&_a]:text-primary [&_a]:underline
            [&_img]:rounded-lg [&_img]:my-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-secondary-foreground/50 text-sm">
            © {new Date().getFullYear()} Mix Rei Concreto Usinado. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
