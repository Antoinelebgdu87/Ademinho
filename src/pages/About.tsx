import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-20 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight mb-6">
              À PROPOS
              <br />
              <span className="text-primary">D'ADEMINHO</span> 🇧🇷
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="font-display font-bold text-2xl tracking-wide mb-4">
                  MON PARCOURS
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Passionné de montage vidéo depuis mes débuts, j'ai développé
                  une expertise unique dans la création de contenus viraux et
                  captivants. Spécialisé en After Effects et Première Pro, je
                  transforme vos idées en vidéos exceptionnelles.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl tracking-wide mb-4">
                  MES COMPÉTENCES
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-display font-semibold text-lg mb-2">
                      After Effects
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Motion Design & Animations
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-display font-semibold text-lg mb-2">
                      Première Pro
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Montage & Color Grading
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-80 h-80 bg-muted rounded-full flex items-center justify-center text-6xl">
                🎬
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="font-display font-bold text-3xl tracking-wide mb-8">
              POURQUOI CHOISIR ADEMINHO ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-muted rounded-lg">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-display font-bold text-xl mb-2">
                  EXPERTISE
                </h3>
                <p className="text-muted-foreground">
                  Plus de 3 ans d'expérience dans le montage vidéo et la
                  création de contenu viral.
                </p>
              </div>
              <div className="p-6 bg-muted rounded-lg">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-display font-bold text-xl mb-2">
                  RAPIDITÉ
                </h3>
                <p className="text-muted-foreground">
                  Livraison rapide sans compromis sur la qualité pour respecter
                  vos deadlines.
                </p>
              </div>
              <div className="p-6 bg-muted rounded-lg">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="font-display font-bold text-xl mb-2">
                  CRÉATIVITÉ
                </h3>
                <p className="text-muted-foreground">
                  Des idées fresh et innovantes pour faire ressortir votre
                  contenu de la masse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
