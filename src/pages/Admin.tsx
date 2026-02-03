import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  LogOut, 
  MessageCircle, 
  Image, 
  MapPin, 
  Plus, 
  Trash2, 
  Save,
  Home,
  Settings
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface WhatsAppNumber {
  number: string;
  label: string;
  active: boolean;
}

interface SiteSettingsData {
  id: string;
  whatsapp_numbers: WhatsAppNumber[];
  logo_url: string | null;
  company_address: string | null;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);
  const [newWhatsapp, setNewWhatsapp] = useState({ number: "", label: "" });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchSettings();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/admin/login");
      return;
    }

    // Check if user has admin role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  };

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .single();

      if (data && !error) {
        setSettings({
          id: data.id,
          whatsapp_numbers: ((data.whatsapp_numbers as unknown) as WhatsAppNumber[]) || [],
          logo_url: data.logo_url,
          company_address: data.company_address,
        });
        if (data.logo_url) {
          setLogoPreview(data.logo_url);
        }
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const addWhatsappNumber = () => {
    if (!newWhatsapp.number || !newWhatsapp.label || !settings) return;

    const cleanNumber = newWhatsapp.number.replace(/\D/g, "");
    if (cleanNumber.length < 10) {
      toast({
        title: "Número inválido",
        description: "Digite um número de telefone válido.",
        variant: "destructive",
      });
      return;
    }

    const updatedNumbers = [
      ...settings.whatsapp_numbers,
      { number: cleanNumber, label: newWhatsapp.label, active: settings.whatsapp_numbers.length === 0 },
    ];

    setSettings({ ...settings, whatsapp_numbers: updatedNumbers });
    setNewWhatsapp({ number: "", label: "" });
  };

  const removeWhatsappNumber = (index: number) => {
    if (!settings) return;
    const updatedNumbers = settings.whatsapp_numbers.filter((_, i) => i !== index);
    setSettings({ ...settings, whatsapp_numbers: updatedNumbers });
  };

  const setActiveWhatsapp = (index: number) => {
    if (!settings) return;
    const updatedNumbers = settings.whatsapp_numbers.map((num, i) => ({
      ...num,
      active: i === index,
    }));
    setSettings({ ...settings, whatsapp_numbers: updatedNumbers });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O logo deve ter no máximo 2MB.",
          variant: "destructive",
        });
        return;
      }
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const saveSettings = async () => {
    if (!settings) return;
    setIsSaving(true);

    try {
      let logoUrl = settings.logo_url;

      // Upload logo if changed
      if (logoFile) {
        const fileExt = logoFile.name.split(".").pop();
        const fileName = `logo-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("logos")
          .upload(fileName, logoFile, { upsert: true });

        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from("logos")
            .getPublicUrl(fileName);
          logoUrl = urlData.publicUrl;
        }
      }

      const { error } = await supabase
        .from("site_settings")
        .update({
          whatsapp_numbers: JSON.parse(JSON.stringify(settings.whatsapp_numbers)),
          logo_url: logoUrl,
          company_address: settings.company_address,
        })
        .eq("id", settings.id);

      if (error) throw error;

      toast({
        title: "Configurações salvas!",
        description: "As alterações foram aplicadas com sucesso.",
      });
    } catch (err) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    }

    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-primary" />
              <span className="font-display text-xl">Painel Administrativo</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="/" target="_blank">
                  <Home className="w-4 h-4 mr-2" />
                  Ver Site
                </a>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* WhatsApp Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Números de WhatsApp
              </CardTitle>
              <CardDescription>
                Gerencie os números de WhatsApp do site. O número ativo será exibido no botão flutuante.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Existing numbers */}
              {settings?.whatsapp_numbers && settings.whatsapp_numbers.length > 0 && (
                <div className="space-y-3">
                  {settings.whatsapp_numbers.map((wp, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Switch
                          checked={wp.active}
                          onCheckedChange={() => setActiveWhatsapp(index)}
                        />
                        <div>
                          <p className="font-medium">{wp.label}</p>
                          <p className="text-sm text-muted-foreground">{wp.number}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeWhatsappNumber(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add new number */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Nome (ex: Vendas)"
                  value={newWhatsapp.label}
                  onChange={(e) => setNewWhatsapp({ ...newWhatsapp, label: e.target.value })}
                  className="flex-1"
                />
                <Input
                  placeholder="Número (ex: 5511999999999)"
                  value={newWhatsapp.number}
                  onChange={(e) => setNewWhatsapp({ ...newWhatsapp, number: e.target.value })}
                  className="flex-1"
                />
                <Button onClick={addWhatsappNumber} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Logo Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5 text-primary" />
                Logo da Empresa
              </CardTitle>
              <CardDescription>
                Faça upload do logo que será exibido no header do site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                {logoPreview && (
                  <div className="w-32 h-16 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="max-w-xs"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Formatos: PNG, JPG, SVG. Tamanho máximo: 2MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Endereço da Empresa
              </CardTitle>
              <CardDescription>
                Este endereço será exibido no rodapé do site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Ex: Rua da Construção, 123 - Centro, Cidade - SP, CEP: 00000-000"
                value={settings?.company_address || ""}
                onChange={(e) =>
                  setSettings(settings ? { ...settings, company_address: e.target.value } : null)
                }
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              variant="hero"
              size="lg"
              onClick={saveSettings}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
