import { useState, useEffect } from "react";
import logoMixrei from "@/assets/logo-mixrei.png";

interface BlogHeaderProps {
  logoUrl?: string | null;
}

const BlogHeader = ({ logoUrl }: BlogHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const displayLogo = logoUrl || logoMixrei;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-secondary/95 backdrop-blur-md shadow-lg"
          : "bg-secondary"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center">
            <img
              src={displayLogo}
              alt="Mix Rei Concreto Usinado"
              className="h-[11rem] w-auto object-contain"
            />
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-primary-foreground/80 hover:text-primary transition-colors font-medium">
              Início
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
