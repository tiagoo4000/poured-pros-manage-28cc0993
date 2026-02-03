import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import heroImage from "@/assets/hero-concrete.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Caminhão betoneira em obra"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          <div className="fade-in-up">
            <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Concreto Usinado de Alta Performance
            </span>
          </div>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-primary-foreground mb-6 fade-in-up stagger-1 leading-tight">
            QUALIDADE E RESISTÊNCIA
            <span className="block text-primary">PARA SUA OBRA</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl fade-in-up stagger-2">
            Fornecemos concreto usinado com a mais alta tecnologia e controle de qualidade 
            para obras residenciais, comerciais e industriais.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 fade-in-up stagger-3">
            <Button
              variant="hero"
              size="xl"
              onClick={() => scrollToSection("contato")}
            >
              <Phone className="w-5 h-5" />
              Solicitar Orçamento
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              onClick={() => scrollToSection("servicos")}
            >
              Nossos Serviços
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 fade-in-up stagger-4">
            <div className="text-center">
              <span className="font-display text-4xl md:text-5xl text-primary block">+15</span>
              <span className="text-primary-foreground/70 text-sm">Anos de Experiência</span>
            </div>
            <div className="text-center">
              <span className="font-display text-4xl md:text-5xl text-primary block">+2000</span>
              <span className="text-primary-foreground/70 text-sm">Obras Realizadas</span>
            </div>
            <div className="text-center">
              <span className="font-display text-4xl md:text-5xl text-primary block">100%</span>
              <span className="text-primary-foreground/70 text-sm">Satisfação</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
