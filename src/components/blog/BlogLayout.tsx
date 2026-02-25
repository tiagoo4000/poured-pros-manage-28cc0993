import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import BlogHeader from "./BlogHeader";
import BlogPostCard from "./BlogPostCard";
import { Newspaper } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  created_at: string;
  slug: string;
}

interface BlogLayoutProps {
  logoUrl?: string | null;
}

const BlogLayout = ({ logoUrl }: BlogLayoutProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, excerpt, cover_image_url, created_at, slug")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (data) setPosts(data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader logoUrl={logoUrl} />

      {/* Hero */}
      <section className="bg-secondary pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Newspaper className="w-12 h-12 text-primary" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-primary-foreground mb-4">
            BLOG MIX REI
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Tudo sobre concreto usinado: dicas, técnicas, novidades do setor e informações para sua obra.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <main className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-display text-3xl text-muted-foreground mb-2">Nenhum post ainda</h2>
            <p className="text-muted-foreground">Em breve publicaremos novos conteúdos.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.id} {...post} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
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

export default BlogLayout;
