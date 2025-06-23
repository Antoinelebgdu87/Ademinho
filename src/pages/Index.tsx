import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import ScrollingBanner from "@/components/ScrollingBanner";
import OrderForm from "@/components/OrderForm";
import { Link } from "react-router-dom";

const Index = () => {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-tight mb-6">
              SALUT, MOI C'EST
              <br />
              <span className="text-primary">ADEMINHO</span> 🇧🇷
            </h1>

            <div className="space-y-4 mb-12">
              <p className="font-display font-bold text-xl sm:text-2xl lg:text-3xl tracking-wide text-foreground/90">
                MONTEUR VIDÉO & CRÉATEUR DE CONTENU
              </p>
              <p className="font-display font-semibold text-lg sm:text-xl lg:text-2xl tracking-wide text-muted-foreground">
                SPÉCIALISÉ EN AFTER EFFECTS & PREMIÈRE PRO
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                asChild
                size="lg"
                className="font-display font-bold text-base tracking-wide px-8 py-6 rounded-full"
              >
                <Link to="/works">VOIR MES TRAVAUX</Link>
              </Button>

              <Dialog open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-display font-bold text-base tracking-wide px-8 py-6 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    COMMANDER UNE VIDÉO
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <OrderForm onClose={() => setIsOrderFormOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 text-6xl opacity-20 animate-float">
          🎬
        </div>
        <div
          className="absolute top-1/3 right-16 text-4xl opacity-20 animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          🎥
        </div>
        <div
          className="absolute bottom-1/4 left-1/4 text-5xl opacity-20 animate-float"
          style={{ animationDelay: "1s" }}
        >
          ✨
        </div>
      </section>

      {/* Services Scrolling Banner */}
      <ScrollingBanner />

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight mb-8">
            CRÉATEUR DE CONTENUS
            <br />
            <span className="text-primary">EXCEPTIONNELS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="space-y-4">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-display font-bold text-xl tracking-wide">
                PRÉCISION
              </h3>
              <p className="text-muted-foreground">
                Chaque frame compte. Montage précis et professionnel pour un
                résultat impeccable.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-display font-bold text-xl tracking-wide">
                RAPIDITÉ
              </h3>
              <p className="text-muted-foreground">
                Livraison rapide sans compromis sur la qualité. Votre contenu
                prêt quand vous en avez besoin.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-display font-bold text-xl tracking-wide">
                CRÉATIVITÉ
              </h3>
              <p className="text-muted-foreground">
                Des idées fresh et des transitions uniques pour faire ressortir
                votre contenu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight mb-6">
            PRÊT À CRÉER QUELQUE CHOSE
            <br />
            <span className="text-primary">D'INCROYABLE ?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Transformons vos idées en vidéos virales
          </p>

          <Dialog open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="font-display font-bold text-lg tracking-wide px-12 py-6 rounded-full"
              >
                COMMENCER MON PROJET
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <OrderForm onClose={() => setIsOrderFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-foreground text-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="font-display font-bold text-2xl tracking-wide mb-6">
            ADEMINHO 🎬
          </h3>
          <p className="text-background/80 mb-8">
            Monteur Vidéo & Créateur de Contenu Brésilien
          </p>

          <div className="flex justify-center space-x-8">
            <a
              href="mailto:monteuressid@gmail.com"
              className="text-background/80 hover:text-background transition-colors font-display font-medium tracking-wide"
            >
              EMAIL
            </a>
            <a
              href="#"
              className="text-background/80 hover:text-background transition-colors font-display font-medium tracking-wide"
            >
              DISCORD
            </a>
            <a
              href="#"
              className="text-background/80 hover:text-background transition-colors font-display font-medium tracking-wide"
            >
              TWITTER
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-background/20 text-background/60 text-sm">
            © 2024 Ademinho Portfolio. Tous droits réservés.
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Index;
