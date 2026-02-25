import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import BlogHeader from "./BlogHeader";
import { Newspaper, Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
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
        .select("id, title, excerpt, content, cover_image_url, created_at, slug")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (data) setPosts(data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  // Extract first paragraph text from HTML content
  const getPreviewText = (html: string, maxLength = 200) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || "";
    return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
  };

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader logoUrl={logoUrl} />

      {/* Hero */}
      <section className="relative bg-secondary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(var(--primary) / 0.1) 35px, hsl(var(--primary) / 0.1) 36px)"
          }} />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Newspaper className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Blog Informativo</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-primary-foreground mb-4">
            BLOG MIX REI
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Tudo sobre concreto usinado: dicas, técnicas, novidades do setor e informações para sua obra.
          </p>
        </div>
      </section>

      {/* Posts as Landing Page Sections */}
      <main>
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
          posts.map((post, index) => {
            const isEven = index % 2 === 0;
            return (
              <section
                key={post.id}
                className={`py-16 md:py-24 ${isEven ? "bg-background" : "bg-muted/40"}`}
              >
                <div className="container mx-auto px-4">
                  <div className={`flex flex-col ${post.cover_image_url ? "lg:flex-row" : ""} gap-8 lg:gap-16 items-center ${!isEven && post.cover_image_url ? "lg:flex-row-reverse" : ""}`}>
                    {/* Image */}
                    {post.cover_image_url && (
                      <div className="w-full lg:w-1/2">
                        <div className="relative rounded-lg overflow-hidden shadow-lg aspect-video">
                          <img
                            src={post.cover_image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className={`w-full ${post.cover_image_url ? "lg:w-1/2" : "max-w-3xl mx-auto text-center"}`}>
                      <div className={`flex items-center gap-2 text-muted-foreground text-sm mb-4 ${!post.cover_image_url ? "justify-center" : ""}`}>
                        <Calendar className="w-4 h-4" />
                        <time>{format(new Date(post.created_at), "dd 'de' MMMM, yyyy", { locale: ptBR })}</time>
                      </div>

                      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                        {post.title}
                      </h2>

                      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                        {post.excerpt || getPreviewText(post.content)}
                      </p>

                      <a
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
                      >
                        Leia o artigo completo
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            );
          })
        )}
      </main>

      {/* CTA Section */}
      {posts.length > 0 && (
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-4xl md:text-5xl text-primary-foreground mb-4">
              PRECISA DE CONCRETO USINADO?
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-8">
              Entre em contato conosco e solicite um orçamento sem compromisso.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-semibold text-lg hover:opacity-90 transition-opacity shadow-orange"
            >
              Solicitar Orçamento
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8 border-t border-border/10">
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
