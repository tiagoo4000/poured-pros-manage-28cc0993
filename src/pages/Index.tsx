import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Benefits from "@/components/Benefits";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BlogLayout from "@/components/blog/BlogLayout";
import { supabase } from "@/integrations/supabase/client";

interface WhatsAppNumber {
  number: string;
  label: string;
  active: boolean;
}

interface SiteSettings {
  whatsapp_number: string | null;
  logo_url: string | null;
  company_address: string | null;
  blog_enabled: boolean;
}

const Index = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    whatsapp_number: "08002880065",
    logo_url: null,
    company_address: null,
    blog_enabled: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .limit(1)
          .single();

        if (data && !error) {
          const whatsappNumbers = (data.whatsapp_numbers as unknown) as WhatsAppNumber[] | null;
          const activeWhatsapp = whatsappNumbers?.find((w) => w.active);
          
          setSettings({
            whatsapp_number: activeWhatsapp?.number || null,
            logo_url: data.logo_url,
            company_address: data.company_address,
            blog_enabled: (data as any).blog_enabled ?? false,
          });
        }
      } catch (err) {
        console.log("Using default settings");
      }
      setIsLoading(false);
    };

    fetchSettings();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Blog mode
  if (settings.blog_enabled) {
    return <BlogLayout logoUrl={settings.logo_url} />;
  }

  // Normal site
  return (
    <div className="min-h-screen">
      <Header logoUrl={settings.logo_url} whatsappNumber={settings.whatsapp_number} />
      <Hero whatsappNumber={settings.whatsapp_number} />
      <About />
      <Services whatsappNumber={settings.whatsapp_number} />
      <Benefits whatsappNumber={settings.whatsapp_number} />
      <Contact />
      <Footer address={settings.company_address} />
      <WhatsAppButton phoneNumber={settings.whatsapp_number} />
    </div>
  );
};

export default Index;
