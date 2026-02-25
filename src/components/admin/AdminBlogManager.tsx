import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit, Eye, EyeOff, X, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
}

const AdminBlogManager = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPosts(data as BlogPost[]);
    setIsLoading(false);
  };

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleSavePost = async () => {
    if (!editingPost?.title || !editingPost?.content) {
      toast({ title: "Preencha título e conteúdo", variant: "destructive" });
      return;
    }

    setIsSaving(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      let coverUrl = editingPost.cover_image_url || null;

      if (coverFile) {
        const ext = coverFile.name.split(".").pop();
        const fileName = `blog-${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("blog-images")
          .upload(fileName, coverFile, { upsert: true });
        if (!uploadErr) {
          const { data: urlData } = supabase.storage
            .from("blog-images")
            .getPublicUrl(fileName);
          coverUrl = urlData.publicUrl;
        }
      }

      const slug = editingPost.slug || generateSlug(editingPost.title);
      const postData = {
        title: editingPost.title,
        slug,
        excerpt: editingPost.excerpt || null,
        content: editingPost.content,
        cover_image_url: coverUrl,
        published: editingPost.published ?? false,
        author_id: session.user.id,
      };

      if (editingPost.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", editingPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert(postData);
        if (error) throw error;
      }

      toast({ title: "Post salvo com sucesso!" });
      setEditingPost(null);
      setIsCreating(false);
      setCoverFile(null);
      fetchPosts();
    } catch (err: any) {
      toast({ title: "Erro ao salvar post", description: err.message, variant: "destructive" });
    }

    setIsSaving(false);
  };

  const handleDeletePost = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (!error) {
      toast({ title: "Post excluído!" });
      fetchPosts();
    }
  };

  const togglePublish = async (post: BlogPost) => {
    await supabase
      .from("blog_posts")
      .update({ published: !post.published })
      .eq("id", post.id);
    fetchPosts();
  };

  if (isLoading) {
    return <div className="flex justify-center py-8"><div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  // Editor view
  if (editingPost !== null || isCreating) {
    const post = editingPost || { title: "", slug: "", excerpt: "", content: "", published: false, cover_image_url: null };
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl">{editingPost?.id ? "Editar Post" : "Novo Post"}</h3>
          <Button variant="ghost" size="sm" onClick={() => { setEditingPost(null); setIsCreating(false); setCoverFile(null); }}>
            <X className="w-4 h-4 mr-1" /> Cancelar
          </Button>
        </div>

        <Input
          placeholder="Título do post"
          value={post.title || ""}
          onChange={(e) => setEditingPost({ ...post, title: e.target.value, slug: generateSlug(e.target.value) })}
        />

        <Input
          placeholder="Slug (URL)"
          value={post.slug || ""}
          onChange={(e) => setEditingPost({ ...post, slug: e.target.value })}
          className="text-sm"
        />

        <Input
          placeholder="Resumo (opcional)"
          value={post.excerpt || ""}
          onChange={(e) => setEditingPost({ ...post, excerpt: e.target.value })}
        />

        <div>
          <label className="text-sm font-medium mb-1 block">Imagem de capa</label>
          <Input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} />
          {(post.cover_image_url || coverFile) && (
            <div className="mt-2 w-full h-32 rounded overflow-hidden bg-muted">
              <img
                src={coverFile ? URL.createObjectURL(coverFile) : post.cover_image_url!}
                alt="Capa"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Conteúdo (HTML)</label>
          <Textarea
            placeholder="<h2>Introdução</h2><p>Texto do post...</p>"
            value={post.content || ""}
            onChange={(e) => setEditingPost({ ...post, content: e.target.value })}
            rows={12}
            className="font-mono text-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <Switch
            checked={post.published ?? false}
            onCheckedChange={(checked) => setEditingPost({ ...post, published: checked })}
          />
          <span className="text-sm">{post.published ? "Publicado" : "Rascunho"}</span>
        </div>

        <Button variant="hero" onClick={handleSavePost} disabled={isSaving} className="w-full">
          {isSaving ? (
            <><div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Salvando...</>
          ) : (
            <><Save className="w-4 h-4" /> Salvar Post</>
          )}
        </Button>
      </div>
    );
  }

  // List view
  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={() => { setIsCreating(true); setEditingPost({ title: "", slug: "", excerpt: "", content: "", published: false, cover_image_url: null }); }}>
        <Plus className="w-4 h-4 mr-2" /> Novo Post
      </Button>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Nenhum post criado ainda.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{post.title}</p>
                <p className="text-sm text-muted-foreground">/{post.slug}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => togglePublish(post)}
                  title={post.published ? "Despublicar" : "Publicar"}
                >
                  {post.published ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setEditingPost(post)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeletePost(post.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogManager;
