import { Award, Target, Users, Shield } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Award,
      title: "Excelência",
      description: "Concreto de alta qualidade com rigoroso controle tecnológico",
    },
    {
      icon: Target,
      title: "Precisão",
      description: "Dosagem exata conforme as especificações da sua obra",
    },
    {
      icon: Users,
      title: "Equipe Especializada",
      description: "Profissionais qualificados e comprometidos com resultados",
    },
    {
      icon: Shield,
      title: "Garantia",
      description: "Produto certificado e dentro das normas técnicas ABNT",
    },
  ];

  return (
    <section id="sobre" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Sobre Nós
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              EXPERIÊNCIA E COMPROMISSO
              <span className="block text-primary">NA CONSTRUÇÃO CIVIL</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Com mais de 15 anos de atuação no mercado, somos referência em concreto usinado 
              na região. Nossa empresa investe constantemente em tecnologia e capacitação 
              para garantir a melhor qualidade em cada entrega.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Trabalhamos com os melhores materiais e equipamentos modernos, 
              assegurando que seu projeto tenha a resistência e durabilidade necessárias 
              para obras de todos os portes.
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="bg-secondary rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <span className="font-display text-7xl text-primary block">+15</span>
                  <span className="text-secondary-foreground text-lg">Anos no Mercado</span>
                </div>
                
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <span className="font-display text-3xl text-primary block">98%</span>
                    <span className="text-secondary-foreground/80 text-sm">Entregas no Prazo</span>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <span className="font-display text-3xl text-primary block">+500</span>
                    <span className="text-secondary-foreground/80 text-sm">Clientes Atendidos</span>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <span className="font-display text-3xl text-primary block">24h</span>
                    <span className="text-secondary-foreground/80 text-sm">Atendimento</span>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <span className="font-display text-3xl text-primary block">ISO</span>
                    <span className="text-secondary-foreground/80 text-sm">Certificado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
