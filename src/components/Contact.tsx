import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: "Telefone",
      value: "800 288 0065",
      href: "tel:8002880065",
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

          {/* Google Maps */}
          <div className="rounded-2xl overflow-hidden h-80">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!4v1770143902112!6m8!1m7!1s07KQWbQc67VJBNapAluBOA!2m2!1d-23.65942130450212!2d-46.55551936770427!3f246.76353586025252!4f4.085677681082686!5f0.7820865974627469" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Mix Rei Concreto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
