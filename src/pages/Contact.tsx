import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  EmailIcon,
  DiscordIcon,
  TwitterIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/SocialIcons";
import {
  loadContent,
  subscribeToContentChanges,
  type SiteContent,
} from "@/lib/storage";

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent>(loadContent());

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);

    // Écoute les changements de contenu en temps réel
    const unsubscribe = subscribeToContentChanges((newContent) => {
      setSiteContent(newContent);
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const contactMethods = [
    {
      icon: <EmailIcon size={48} className="hover:text-red-500" />,
      title: "EMAIL PROFESSIONNEL",
      value: siteContent.contact.email,
      description: "Pour les demandes de projets et collaborations",
      link: `mailto:${siteContent.contact.email}`,
      color: "hover:border-red-500",
    },
    {
      icon: <DiscordIcon size={48} className="hover:text-indigo-500" />,
      title: "DISCORD ULTRA-RAPIDE",
      value: siteContent.contact.discord,
      description: "Discussions en temps réel et échanges créatifs",
      link: "#",
      color: "hover:border-indigo-500",
    },
    {
      icon: <TwitterIcon size={48} className="hover:text-black" />,
      title: "TWITTER / X",
      value: siteContent.contact.twitter,
      description: "Suivez mes dernières créations et actualités",
      link: `https://x.com/${siteContent.contact.twitter.replace("@", "")}`,
      color: "hover:border-black",
    },
  ];

  const socialPlatforms = [
    {
      icon: <InstagramIcon size={40} className="hover:text-pink-500" />,
      name: "INSTAGRAM",
      handle: siteContent.contact.instagram || "@ademinho__mp4",
      description: "Reels et stories exclusives",
      color: "hover:border-pink-500",
    },
    {
      icon: <TikTokIcon size={40} className="hover:text-black" />,
      name: "TIKTOK",
      handle: siteContent.contact.tiktok || "@ademinho__mp4",
      description: "Contenus viraux et tendances",
      color: "hover:border-black",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-20 pb-16 px-6 relative overflow-hidden">
        {/* Arrière-plan animé */}
        <div className="absolute inset-0 opacity-5">
          <div className="animate-blob absolute top-10 left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="animate-blob animation-delay-2000 absolute top-10 right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="animate-blob animation-delay-4000 absolute bottom-10 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight mb-6 animate-fade-in-up">
              RESTONS EN
              <br />
              <span className="text-primary animate-text-shimmer">
                CONTACT
              </span>{" "}
              📱
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up stagger-2">
              Prêt à transformer vos idées en vidéos exceptionnelles qui
              explosentent les compteurs ? Écrivez-moi ! 🚀
            </p>
          </div>

          {/* Méthodes de contact principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card
                key={method.title}
                className={`text-center hover:shadow-xl transition-all duration-500 group animate-scale-in stagger-${index + 3} border-2 hover-grow ${method.color} hover-glow`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-500 animate-bounce-slow">
                    {method.icon}
                  </div>
                  <CardTitle className="font-display font-bold text-xl tracking-wide text-primary">
                    {method.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-display font-bold text-lg hover:text-primary transition-colors">
                    {method.value}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {method.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full font-display font-semibold tracking-wide hover-grow hover-glow group-hover:border-primary group-hover:text-primary"
                  >
                    <a href={method.link} target="_blank" rel="noopener">
                      🚀 CONTACTER MAINTENANT
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Réseaux sociaux supplémentaires */}
          <div className="mb-16">
            <h2 className="font-display font-bold text-3xl text-center mb-8 animate-fade-in-up">
              🌟 SUIVEZ-MOI PARTOUT
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {socialPlatforms.map((platform, index) => (
                <Card
                  key={platform.name}
                  className={`text-center hover:shadow-lg transition-all duration-300 group animate-slide-in-left stagger-${index + 6} border-2 hover-grow ${platform.color}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {platform.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="font-display font-bold text-lg">
                          {platform.name}
                        </h3>
                        <p className="text-primary font-semibold">
                          {platform.handle}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {platform.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Temps de réponse avec animations */}
          <div className="bg-gradient-to-r from-muted/50 to-primary/10 rounded-xl p-8 text-center mb-16 animate-fade-in-up stagger-7 hover-glow">
            <h2 className="font-display font-bold text-3xl tracking-wide mb-6 text-primary animate-text-shimmer">
              ⚡ TEMPS DE RÉPONSE ULTRA-RAPIDE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-bounce-slow">
                <div className="text-4xl mb-3 animate-pulse-glow">📧</div>
                <h3 className="font-display font-semibold text-xl mb-2 text-primary">
                  EMAIL
                </h3>
                <p className="text-muted-foreground font-bold">
                  Moins de 24h garanti !
                </p>
              </div>
              <div className="animate-wiggle">
                <div className="text-4xl mb-3 animate-pulse-glow">💬</div>
                <h3 className="font-display font-semibold text-xl mb-2 text-primary">
                  DISCORD
                </h3>
                <p className="text-muted-foreground font-bold">
                  Quasi instantané ⚡
                </p>
              </div>
              <div className="animate-float">
                <div className="text-4xl mb-3 animate-pulse-glow">📱</div>
                <h3 className="font-display font-semibold text-xl mb-2 text-primary">
                  RÉSEAUX SOCIAUX
                </h3>
                <p className="text-muted-foreground font-bold">
                  Quelques heures max
                </p>
              </div>
            </div>
          </div>

          {/* Section fuseau horaire avec statut */}
          <div className="text-center animate-fade-in-up stagger-8">
            <Card className="max-w-md mx-auto hover-glow hover-grow">
              <CardContent className="p-8">
                <h2 className="font-display font-bold text-2xl mb-4 text-primary">
                  🌍 FUSEAU HORAIRE
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-3xl animate-wiggle">🇧🇷</span>
                    <div>
                      <p className="font-semibold">Basé au Brésil</p>
                      <p className="text-muted-foreground text-sm">(GMT-3)</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-glow"></div>
                    <span className="font-semibold text-green-600">
                      {siteContent.availability.status === "disponible"
                        ? "DISPONIBLE MAINTENANT"
                        : siteContent.availability.status === "occupé"
                          ? "OCCUPÉ - RÉPONSE DIFFÉRÉE"
                          : "EN PAUSE"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {siteContent.availability.message}
                  </p>
                  <p className="text-muted-foreground font-semibold">
                    🌐 Disponible pour projets internationaux
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call-to-action final */}
          <div className="text-center mt-16 animate-fade-in-up stagger-9">
            <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-2 border-primary/20 hover-glow">
              <CardContent className="p-12">
                <h2 className="font-display font-black text-3xl sm:text-4xl mb-6 text-primary animate-text-shimmer">
                  🚀 PRÊT POUR L'AVENTURE ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Ne laissez pas vos idées géniales dormir ! Contactez-moi
                  maintenant et créons ensemble du contenu qui marquera les
                  esprits ! 🔥
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="font-display font-bold text-lg tracking-wide px-8 py-6 rounded-full animate-pulse-glow hover-grow"
                  >
                    <a href={`mailto:${siteContent.contact.email}`}>
                      📧 ENVOYER UN EMAIL
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="font-display font-bold text-lg tracking-wide px-8 py-6 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover-grow"
                  >
                    <a href="/#order">🎬 COMMANDER UNE VIDÉO</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
