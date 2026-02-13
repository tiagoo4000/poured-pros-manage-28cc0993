import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Benefits from "@/components/Benefits";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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
}

const Index = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    whatsapp_number: "08002880065", // Default number
    logo_url: null,
    company_address: null,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .limit(1)
          .single();

        if (data && !error) {
          // Parse whatsapp_numbers and find active one
          const whatsappNumbers = (data.whatsapp_numbers as unknown) as WhatsAppNumber[] | null;
          const activeWhatsapp = whatsappNumbers?.find((w) => w.active);
          
          setSettings({
            whatsapp_number: activeWhatsapp?.number || null,
            logo_url: data.logo_url,
            company_address: data.company_address,
          });
        }
      } catch (err) {
        console.log("Using default settings");
      }
    };

    fetchSettings();
  }, []);

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
