import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BlogPostCardProps {
  id: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  created_at: string;
  slug: string;
}

const BlogPostCard = ({ title, excerpt, cover_image_url, created_at, slug }: BlogPostCardProps) => {
  return (
    <a
      href={`/blog/${slug}`}
      className="industrial-card group block overflow-hidden"
    >
      {cover_image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={cover_image_url}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
          <Calendar className="w-4 h-4" />
          <time>{format(new Date(created_at), "dd 'de' MMMM, yyyy", { locale: ptBR })}</time>
        </div>
        <h2 className="font-display text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
          {title}
        </h2>
        {excerpt && (
          <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
        )}
        <span className="inline-block mt-4 text-primary font-semibold text-sm group-hover:underline">
          Leia mais →
        </span>
      </div>
    </a>
  );
};

export default BlogPostCard;
