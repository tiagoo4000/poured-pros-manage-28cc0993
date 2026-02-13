import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import serviceConcrete from "@/assets/service-concrete.jpg";
import serviceBombeado from "@/assets/service-bombeado.jpg";
import serviceComercial from "@/assets/service-comercial.jpg";

interface ServicesProps {
  whatsappNumber?: string | null;
}

const Services = ({ whatsappNumber }: ServicesProps) => {
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento de concreto usinado.")}`
    : "#contato";

  const services = [
    {
      image: serviceConcrete,
      title: "Concreto Usinado",
      description:
        "Concreto dosado em central com controle tecnológico rigoroso, garantindo a resistência ideal para sua obra. Disponível em diversas especificações de fck.",
      features: ["Controle de qualidade", "Rastreabilidade", "Nota fiscal eletrônica"],
    },
    {
      image: serviceBombeado,
      title: "Concreto Bombeado",
      description:
        "Transporte e aplicação do concreto através de bombas de alta pressão, ideal para locais de difícil acesso e obras em altura.",
      features: ["Bomba estacionária", "Bomba lança", "Maior produtividade"],
    },
    {
      image: serviceComercial,
      title: "Obras Comerciais e Residenciais",
      description:
        "Atendemos projetos de todos os portes, desde residências até grandes empreendimentos comerciais e industriais.",
      features: ["Obras residenciais", "Galpões industriais", "Edifícios comerciais"],
    },
  ];

  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Nossos Serviços
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            SOLUÇÕES COMPLETAS
            <span className="block text-primary">EM CONCRETO</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Oferecemos uma linha completa de serviços para atender todas as necessidades 
            da sua construção com qualidade e eficiência.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="industrial-card overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-display text-2xl text-primary-foreground">
                  {service.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full group/btn"
                  asChild
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Solicitar Orçamento
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
