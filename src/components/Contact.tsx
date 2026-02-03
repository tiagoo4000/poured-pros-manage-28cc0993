import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: "Telefone",
      value: "0800 288 0065",
      href: "tel:08002880065",
    },
    {
      icon: Mail,
      label: "E-mail",
      value: "contato@mixreiconcretousinado.com",
      href: "mailto:contato@mixreiconcretousinado.com",
    },
    {
      icon: MapPin,
      label: "Endereço",
      value: "Rua Cantagalo 55, Vila Sacadura Cabral, Santo André - SP, 09060-720",
    },
    {
      icon: Clock,
      label: "Horário",
      value: "Seg a Sex: 7h às 18h | Sáb: 7h às 12h",
    },
  ];

  return (
    <section id="contato" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Fale Conosco
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            ENTRE EM
            <span className="block text-primary">CONTATO</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Nossa equipe está pronta para atender você e oferecer a melhor solução para sua obra.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info Grid */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-start gap-4 p-6 bg-background rounded-xl border border-border hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <info.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{info.label}</span>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="block font-semibold text-lg text-foreground hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-lg text-foreground">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="bg-secondary rounded-2xl h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-secondary-foreground text-lg">Mapa de Localização</p>
              <p className="text-secondary-foreground/60 text-sm mt-2">Rua Cantagalo 55, Vila Sacadura Cabral, Santo André - SP</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
