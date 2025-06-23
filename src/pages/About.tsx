import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  loadContent,
  subscribeToContentChanges,
  type SiteContent,
} from "@/lib/storage";

const About = () => {
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

  const skills = [
    {
      name: "AFTER EFFECTS",
      level: 98,
      description: "Maître des effets visuels et motion design",
      color: "bg-purple-500",
    },
    {
      name: "PREMIÈRE PRO",
      level: 95,
      description: "Expert en montage vidéo professionnel",
      color: "bg-blue-500",
    },
    {
      name: "MOTION DESIGN",
      level: 92,
      description: "Créateur d'animations époustouflantes",
      color: "bg-pink-500",
    },
    {
      name: "COLOR GRADING",
      level: 88,
      description: "Artiste de la colorimétrie cinématographique",
      color: "bg-orange-500",
    },
    {
      name: "STORYTELLING",
      level: 94,
      description: "Narrateur d'histoires captivantes",
      color: "bg-green-500",
    },
    {
      name: "CRÉATIVITÉ",
      level: 99,
      description: "Innovation et idées révolutionnaires",
      color: "bg-primary",
    },
  ];

  const achievements = [
    {
      title: "50M+ VUES GÉNÉRÉES",
      description: "Sur toutes les plateformes confondues",
      color: "text-yellow-500",
    },
    {
      title: "200+ PROJETS RÉALISÉS",
      description: "Clients satisfaits dans le monde entier",
      color: "text-blue-500",
    },
    {
      title: "24H TEMPS MOYEN",
      description: "De réponse aux demandes clients",
      color: "text-green-500",
    },
    {
      title: "98% TAUX DE SATISFACTION",
      description: "Clients qui reviennent pour plus",
      color: "text-red-500",
    },
  ];

  const journey = [
    {
      year: "2021",
      title: "PREMIERS PAS",
      description:
        "Découverte de la passion pour le montage vidéo et After Effects",
    },
    {
      year: "2022",
      title: "EXPERTISE TECHNIQUE",
      description:
        "Maîtrise avancée des outils et techniques de post-production",
    },
    {
      year: "2023",
      title: "SUCCÈS VIRAL",
      description: "Premiers contenus viraux atteignant des millions de vues",
    },
    {
      year: "2024",
      title: "EXPERTISE RECONNUE",
      description:
        "Monteur vidéo professionnel avec une clientèle internationale",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-20 pb-16 px-6 relative overflow-hidden">
        {/* Arrière-plan animé */}
        <div className="absolute inset-0 opacity-5">
          <div className="animate-blob absolute top-0 left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="animate-blob animation-delay-2000 absolute top-0 right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Hero Section */}
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight mb-6 animate-fade-in-up">
              À PROPOS
              <br />
              <span className="text-primary">D'ADEMINHO</span> BRÉSIL
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up stagger-2 leading-relaxed">
              {siteContent.aboutText}
            </p>
          </div>

          {/* Statistiques impressionnantes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {achievements.map((achievement, index) => (
              <Card
                key={achievement.title}
                className={`text-center hover:shadow-xl transition-all duration-500 animate-scale-in stagger-${index + 3} hover-grow hover-glow border-2 hover:border-primary/50`}
              >
                <CardContent className="p-6">
                  <h3 className="font-display font-bold text-lg mb-2 text-primary">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Section Compétences */}
          <div className="mb-20">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-center mb-12 animate-fade-in-up">
              MES SUPER-POUVOIRS
              <br />
              <span className="text-primary">CRÉATIFS</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <Card
                  key={skill.name}
                  className={`hover:shadow-xl transition-all duration-500 animate-slide-in-left stagger-${index + 1} hover-grow group border-2 hover:border-primary/50`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className="font-bold text-primary"
                      >
                        {skill.level}%
                      </Badge>
                    </div>
                    <CardTitle className="font-display font-bold text-lg tracking-wide">
                      {skill.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      {skill.description}
                    </p>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: `${skill.level}%`,
                        }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline du parcours */}
          <div className="mb-20">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-center mb-12 animate-fade-in-up">
              MON PARCOURS
              <br />
              <span className="text-primary">LÉGENDAIRE</span>
            </h2>

            <div className="relative">
              {/* Ligne de temps */}
              <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-primary to-purple-500 rounded-full animate-gradient"></div>

              <div className="space-y-12">
                {journey.map((step, index) => (
                  <div
                    key={step.year}
                    className={`flex items-center animate-fade-in-up stagger-${index + 1} ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <Card
                      className={`max-w-md hover:shadow-xl transition-all duration-500 hover-grow hover-glow ${
                        index % 2 === 0 ? "mr-8" : "ml-8"
                      } border-2 hover:border-primary/50`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div>
                            <Badge
                              variant="outline"
                              className="text-primary border-primary font-bold"
                            >
                              {step.year}
                            </Badge>
                            <h3 className="font-display font-bold text-lg mt-1">
                              {step.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Point sur la timeline */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background animate-pulse-glow"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section pourquoi choisir Ademinho */}
          <div className="text-center">
            <h2 className="font-display font-black text-3xl sm:text-5xl mb-12 animate-fade-in-up">
              POURQUOI CHOISIR
              <br />
              <span className="text-primary animate-text-shimmer">
                ADEMINHO ?
              </span>{" "}
              🤔
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 bg-gradient-to-br from-background to-primary/5 hover:shadow-xl transition-all duration-500 animate-slide-in-left stagger-1 hover-grow hover-glow border-2 hover:border-primary/50">
                <div className="text-5xl mb-6 animate-rotate-slow">🎯</div>
                <h3 className="font-display font-bold text-2xl mb-4 text-primary">
                  EXPERTISE INÉGALÉE
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Plus de 3 ans d'expérience intensive dans le montage vidéo et
                  la création de contenu viral. Chaque projet est une œuvre
                  d'art unique.
                </p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 hover:shadow-xl transition-all duration-500 animate-fade-in-up stagger-2 hover-grow hover-glow border-2 hover:border-primary/50">
                <div className="text-5xl mb-6 animate-wiggle">⚡</div>
                <h3 className="font-display font-bold text-2xl mb-4 text-primary">
                  VITESSE SUPERSONIQUE
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Livraison ultra-rapide sans compromis sur la qualité. Votre
                  contenu prêt à exploser les compteurs en un temps record ! 🚀
                </p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-background to-pink-500/5 hover:shadow-xl transition-all duration-500 animate-slide-in-right stagger-3 hover-grow hover-glow border-2 hover:border-primary/50">
                <div className="text-5xl mb-6 animate-float">💡</div>
                <h3 className="font-display font-bold text-2xl mb-4 text-primary">
                  CRÉATIVITÉ EXPLOSIVE
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Des idées révolutionnaires et des concepts innovants qui font
                  la différence. Votre contenu sera unique et mémorable ! ✨
                </p>
              </Card>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-20 animate-fade-in-up stagger-4">
            <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-2 border-primary/20 hover-glow">
              <CardContent className="p-12">
                <h2 className="font-display font-black text-3xl sm:text-4xl mb-6 text-primary animate-text-shimmer">
                  🚀 PRÊT À COLLABORER ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Transformons ensemble vos idées en contenus viraux
                  exceptionnels qui marqueront les esprits !
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
