import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  const contactMethods = [
    {
      icon: "📧",
      title: "EMAIL",
      value: "monteuressid@gmail.com",
      description: "Pour les demandes professionnelles",
      link: "mailto:monteuressid@gmail.com",
    },
    {
      icon: "💬",
      title: "DISCORD",
      value: "@ademinho__mp4",
      description: "Discussions en temps réel",
      link: "#",
    },
    {
      icon: "🐦",
      title: "TWITTER / X",
      value: "@ademinho__mp4",
      description: "Suivez mes dernières créations",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-20 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight mb-6">
              RESTONS EN
              <br />
              <span className="text-primary">CONTACT</span> 📱
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Prêt à transformer vos idées en vidéos exceptionnelles ?
              Écrivez-moi !
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method) => (
              <Card
                key={method.title}
                className="text-center hover:shadow-lg transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  <CardTitle className="font-display font-bold text-xl tracking-wide">
                    {method.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-display font-semibold text-lg">
                    {method.value}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {method.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full font-display font-semibold tracking-wide"
                  >
                    <a href={method.link}>CONTACTER</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted rounded-lg p-8 text-center">
            <h2 className="font-display font-bold text-3xl tracking-wide mb-4">
              TEMPS DE RÉPONSE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-display font-semibold text-lg mb-1">
                  EMAIL
                </h3>
                <p className="text-muted-foreground">Sous 24h</p>
              </div>
              <div>
                <div className="text-2xl mb-2">💬</div>
                <h3 className="font-display font-semibold text-lg mb-1">
                  DISCORD
                </h3>
                <p className="text-muted-foreground">Quasi instantané</p>
              </div>
              <div>
                <div className="text-2xl mb-2">📱</div>
                <h3 className="font-display font-semibold text-lg mb-1">
                  RÉSEAUX
                </h3>
                <p className="text-muted-foreground">Quelques heures</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <h2 className="font-display font-bold text-3xl tracking-wide mb-6">
              FUSEAU HORAIRE
            </h2>
            <p className="text-muted-foreground mb-4">
              🇧🇷 Basé au Brésil (GMT-3)
            </p>
            <p className="text-muted-foreground">
              Disponible pour des projets internationaux
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
