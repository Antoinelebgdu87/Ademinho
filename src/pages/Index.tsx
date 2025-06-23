import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import ScrollingBanner from "@/components/ScrollingBanner";
import OrderForm from "@/components/OrderForm";
import { EmailIcon, DiscordIcon, TwitterIcon } from "@/components/SocialIcons";
import { Link } from "react-router-dom";
import {
  loadContent,
  subscribeToContentChanges,
  type SiteContent,
} from "@/lib/storage";

const Index = () => {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent>(loadContent());

  useEffect(() => {
    // Animation de chargement progressive
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

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navigation />

      {/* Hero Section avec animations avancées */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        {/* Arrière-plan animé */}
        <div className="absolute inset-0 opacity-5">
          <div className="animate-blob absolute top-0 left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="animate-blob animation-delay-2000 absolute top-0 right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div
            className={`text-center transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Titre principal avec effet shimmer */}
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-tight mb-6 animate-fade-in-up">
              <span className="block animate-slide-in-left stagger-1">
                SALUT, MOI C'EST
              </span>
              <span className="block text-primary animate-slide-in-right stagger-2">
                ADEMINHO
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-muted-foreground">
                BRÉSIL
              </span>
            </h1>

            {/* Sous-titres avec animations échelonnées */}
            <div className="space-y-4 mb-12">
              <p className="font-display font-bold text-xl sm:text-2xl lg:text-3xl tracking-wide text-foreground/90 animate-fade-in-up stagger-3">
                MONTEUR VIDÉO & CRÉATEUR DE CONTENU
              </p>
              <p className="font-display font-semibold text-lg sm:text-xl lg:text-2xl tracking-wide text-muted-foreground animate-fade-in-up stagger-4">
                SPÉCIALISÉ EN AFTER EFFECTS & PREMIÈRE PRO
              </p>
            </div>

            {/* Boutons avec animations et effets */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up stagger-5">
              <Button
                asChild
                size="lg"
                className="font-display font-bold text-base tracking-wide px-8 py-6 rounded-full hover-glow hover-grow transform transition-all duration-300"
              >
                <Link to="/works">VOIR MES CRÉATIONS</Link>
              </Button>

              <Dialog open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-display font-bold text-base tracking-wide px-8 py-6 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover-grow transform transition-all duration-500 hover:shadow-2xl"
                  >
                    COMMANDER UNE VIDÉO
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in">
                  <DialogTitle className="sr-only">
                    Commander une vidéo
                  </DialogTitle>
                  <OrderForm onClose={() => setIsOrderFormOpen(false)} />
                </DialogContent>
              </Dialog>

              <Button
                asChild
                size="sm"
                variant="ghost"
                className="font-display font-semibold text-sm tracking-wide px-4 py-2 rounded-full text-muted-foreground hover:text-foreground opacity-50 hover:opacity-100 transition-all duration-300"
              >
                <Link to="/admin">ADMIN</Link>
              </Button>
            </div>

            {/* Statistiques animées */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in-up stagger-6">
              <div className="text-center hover-grow transition-transform duration-300">
                <div className="text-4xl lg:text-6xl font-black text-primary mb-2">
                  0
                </div>
                <p className="font-display font-semibold text-muted-foreground">
                  VUES GÉNÉRÉES
                </p>
              </div>
              <div className="text-center hover-grow transition-transform duration-300">
                <div className="text-4xl lg:text-6xl font-black text-primary mb-2">
                  0
                </div>
                <p className="font-display font-semibold text-muted-foreground">
                  PROJETS RÉALISÉS
                </p>
              </div>
              <div className="text-center hover-grow transition-transform duration-300">
                <div className="text-4xl lg:text-6xl font-black text-primary mb-2">
                  98%
                </div>
                <p className="font-display font-semibold text-muted-foreground">
                  CLIENTS SATISFAITS
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Scrolling Banner */}
      <ScrollingBanner />

      {/* Section À Propos avec animations */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight mb-8 animate-fade-in-up">
            CRÉATEUR DE CONTENUS
            <br />
            <span className="text-primary">PROFESSIONNELS</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-16 animate-fade-in-up stagger-2 max-w-3xl mx-auto leading-relaxed">
            {siteContent.aboutText}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="space-y-4 animate-slide-in-left stagger-1 hover-grow p-6 rounded-lg bg-gradient-to-br from-background to-muted hover:shadow-xl transition-all duration-300">
              <h3 className="font-display font-bold text-xl tracking-wide text-primary">
                PRÉCISION MILLIMÉTRIQUE
              </h3>
              <p className="text-muted-foreground">
                Chaque frame compte. Montage précis et professionnel pour un
                résultat qui dépasse vos attentes les plus folles.
              </p>
            </div>

            <div className="space-y-4 animate-fade-in-up stagger-2 hover-grow p-6 rounded-lg bg-gradient-to-br from-background to-muted hover:shadow-xl transition-all duration-300">
              <h3 className="font-display font-bold text-xl tracking-wide text-primary">
                VITESSE SUPERSONIQUE
              </h3>
              <p className="text-muted-foreground">
                Livraison ultra-rapide sans compromis sur la qualité. Votre
                contenu viral prêt en un temps record.
              </p>
            </div>

            <div className="space-y-4 animate-slide-in-right stagger-3 hover-grow p-6 rounded-lg bg-gradient-to-br from-background to-muted hover:shadow-xl transition-all duration-300">
              <h3 className="font-display font-bold text-xl tracking-wide text-primary">
                CRÉATIVITÉ EXPLOSIVE
              </h3>
              <p className="text-muted-foreground">
                Des idées révolutionnaires et des transitions époustouflantes
                qui font exploser votre audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Technologies avec animations */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight mb-12 animate-fade-in-up">
            EXPERTISES
            <br />
            <span className="text-primary">TECHNIQUES</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "AFTER EFFECTS", level: "EXPERT" },
              { name: "PREMIÈRE PRO", level: "AVANCÉ" },
              { name: "MOTION DESIGN", level: "SPÉCIALISTE" },
              { name: "COLOR GRADING", level: "PROFESSIONNEL" },
            ].map((tech, index) => (
              <div
                key={tech.name}
                className={`p-6 bg-background rounded-lg hover-grow hover-glow animate-scale-in stagger-${index + 1} cursor-pointer transform transition-all duration-300 border border-muted`}
              >
                <h3 className="font-display font-bold text-sm tracking-wide mb-2 text-primary">
                  {tech.name}
                </h3>
                <p className="text-xs text-muted-foreground font-semibold">
                  {tech.level}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA avec animations intenses */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 to-purple-500/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight mb-6 animate-fade-in-up">
            PRÊT À CRÉER QUELQUE CHOSE
            <br />
            <span className="text-primary">D'EXCEPTIONNEL ?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up stagger-2">
            Transformons vos idées en vidéos professionnelles qui marquent les
            esprits
          </p>

          <Dialog open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="font-display font-bold text-lg tracking-wide px-12 py-6 rounded-full hover-grow hover:shadow-2xl transform transition-all duration-500"
              >
                COMMENCER MON PROJET
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in">
              <DialogTitle className="sr-only">Commander une vidéo</DialogTitle>
              <OrderForm onClose={() => setIsOrderFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Footer avec vrais logos sociaux */}
      <footer className="py-12 px-6 bg-foreground text-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="font-display font-bold text-2xl tracking-wide mb-6 animate-fade-in-up">
            ADEMINHO
          </h3>
          <p className="text-background/80 mb-8 animate-fade-in-up stagger-2">
            Monteur Vidéo & Créateur de Contenu Brésilien Légendaire
          </p>

          <div className="flex justify-center space-x-8 mb-8">
            <a
              href={`mailto:${siteContent.contact.email}`}
              className="text-background/80 hover:text-background transition-all duration-300 hover-grow hover:text-primary animate-fade-in-up stagger-3"
              title="Email"
            >
              <EmailIcon
                size={32}
                className="hover:scale-125 transition-transform"
              />
            </a>
            <a
              href="#"
              className="text-background/80 hover:text-background transition-all duration-300 hover-grow hover:text-blue-400 animate-fade-in-up stagger-4"
              title="Discord"
            >
              <DiscordIcon
                size={32}
                className="hover:scale-125 transition-transform"
              />
            </a>
            <a
              href="#"
              className="text-background/80 hover:text-background transition-all duration-300 hover-grow hover:text-blue-500 animate-fade-in-up stagger-5"
              title="Twitter/X"
            >
              <TwitterIcon
                size={32}
                className="hover:scale-125 transition-transform"
              />
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-background/20 text-background/60 text-sm animate-fade-in-up stagger-6">
            © 2024 Ademinho Portfolio. Tous droits réservés. Made with passion
            in Brazil
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
