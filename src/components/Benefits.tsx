import { 
  Clock, 
  Truck, 
  FlaskConical, 
  Headphones, 
  Leaf, 
  FileCheck 
} from "lucide-react";

interface BenefitsProps {
  whatsappNumber?: string | null;
}

const Benefits = ({ whatsappNumber }: BenefitsProps) => {
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento de concreto usinado.")}`
    : "#contato";
  const benefits = [
    {
      icon: FlaskConical,
      title: "Controle Tecnológico",
      description:
        "Laboratório próprio com ensaios de resistência e slump test para garantir a qualidade do concreto.",
    },
    {
      icon: Truck,
      title: "Frota Moderna",
      description:
        "Caminhões betoneira de última geração com rastreamento GPS e manutenção preventiva.",
    },
    {
      icon: Clock,
      title: "Pontualidade",
      description:
        "Compromisso com prazos de entrega para não atrasar o cronograma da sua obra.",
    },
    {
      icon: Headphones,
      title: "Suporte Técnico",
      description:
        "Equipe de engenheiros disponível para orientação técnica e acompanhamento da concretagem.",
    },
    {
      icon: Leaf,
      title: "Sustentabilidade",
      description:
        "Processos sustentáveis e responsabilidade ambiental em todas as etapas da produção.",
    },
    {
      icon: FileCheck,
      title: "Documentação",
      description:
        "Laudo técnico, nota fiscal eletrônica e certificados de qualidade para sua segurança.",
    },
  ];

  return (
    <section id="diferenciais" className="py-20 section-dark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Por Que Nos Escolher
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-secondary-foreground mb-6">
            NOSSOS DIFERENCIAIS
            <span className="block text-primary">PARA SUA OBRA</span>
          </h2>
          <p className="text-secondary-foreground/70 text-lg">
            Combinamos experiência, tecnologia e atendimento personalizado para 
            entregar o melhor concreto para sua construção.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="bg-secondary/50 border border-border/20 rounded-xl p-6 hover:bg-secondary/70 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl text-secondary-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-secondary-foreground/70 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-primary/10 border border-primary/30 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="font-display text-3xl md:text-4xl text-secondary-foreground mb-4">
            PRONTO PARA COMEÇAR SUA OBRA?
          </h3>
          <p className="text-secondary-foreground/70 text-lg mb-6 max-w-xl mx-auto">
            Entre em contato conosco e solicite um orçamento sem compromisso. 
            Nossa equipe está pronta para atender você.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform shadow-orange"
          >
            Solicitar Orçamento Agora
          </a>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
