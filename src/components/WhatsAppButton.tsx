import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string | null;
}

const WhatsAppButton = ({ phoneNumber }: WhatsAppButtonProps) => {
  if (!phoneNumber) return null;

  // Clean phone number - remove all non-digits
  const cleanPhone = phoneNumber.replace(/\D/g, "");
  
  const message = encodeURIComponent(
    "Olá! Gostaria de solicitar um orçamento de concreto usinado."
  );
  
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float flex items-center justify-center w-16 h-16 bg-whatsapp hover:bg-whatsapp-dark rounded-full shadow-lg transition-all hover:scale-110"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-primary-foreground" />
    </a>
  );
};

export default WhatsAppButton;
