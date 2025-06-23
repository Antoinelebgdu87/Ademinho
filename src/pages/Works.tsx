import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OrderForm from "@/components/OrderForm";
import {
  loadContent,
  subscribeToContentChanges,
  type SiteContent,
} from "@/lib/storage";

const Works = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
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

  // Récupère toutes les catégories uniques
  const categories = [
    "Tous",
    ...Array.from(
      new Set(siteContent.projects.map((project) => project.category)),
    ),
  ];

  // Filtre les projets par catégorie
  const filteredProjects =
    selectedCategory === "Tous"
      ? siteContent.projects
      : siteContent.projects.filter(
          (project) => project.category === selectedCategory,
        );

  const stats = [
    {
      number: "50M+",
      label: "VUES TOTALES",
      icon: "👁️",
      color: "text-blue-500",
    },
    {
      number: "200+",
      label: "PROJETS RÉALISÉS",
      icon: "🎬",
      color: "text-green-500",
    },
    {
      number: "15+",
      label: "CONTENUS VIRAUX",
      icon: "🚀",
      color: "text-purple-500",
    },
    {
      number: "98%",
      label: "CLIENTS SATISFAITS",
      icon: "⭐",
      color: "text-yellow-500",
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

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Hero Section */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight mb-6 animate-fade-in-up">
              MES
              <br />
              <span className="text-primary">CRÉATIONS ÉPIQUES</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up stagger-2 leading-relaxed">
              Découvrez une sélection de mes meilleurs projets de montage vidéo
              et motion design qui ont explosé les compteurs ! Chaque création
              raconte une histoire unique. 🚀
            </p>
          </div>

          {/* Statistiques impressionnantes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className={`text-center hover:shadow-xl transition-all duration-500 animate-scale-in stagger-${index + 3} hover-grow hover-glow border-2 hover:border-primary/50`}
              >
                <CardContent className="p-6">
                  <div
                    className={`text-4xl mb-3 animate-bounce-slow ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-2xl lg:text-3xl font-black text-primary mb-1">
                    {stat.number}
                  </div>
                  <p className="font-display font-semibold text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filtres de catégories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up stagger-5">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`font-display font-semibold tracking-wide hover-grow transition-all duration-300 ${
                  selectedCategory === category
                    ? "animate-pulse-glow"
                    : "hover-glow"
                }`}
              >
                {category === "Tous" ? "🌟 TOUS" : `${category}`}
              </Button>
            ))}
          </div>

          {/* Grille des projets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className={`group overflow-hidden border-2 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 animate-scale-in stagger-${(index % 6) + 1} hover-grow cursor-pointer relative`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                <div className="aspect-video bg-gradient-to-br from-muted to-primary/20 flex items-center justify-center text-6xl lg:text-8xl group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                  <div className="animate-bounce-slow group-hover:animate-wiggle">
                    {project.thumbnail}
                  </div>
                  {/* Effet de play au hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-4xl animate-pulse-glow">
                      ▶️
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 relative z-20">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="secondary"
                      className="font-display font-semibold tracking-wider text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      {project.category}
                    </Badge>
                    <div className="text-primary group-hover:scale-125 transition-transform animate-float">
                      ✨
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl tracking-wide mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 font-display font-semibold tracking-wide hover-glow group-hover:border-primary group-hover:text-primary"
                    >
                      👀 VOIR LE PROJET
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="px-3 hover:bg-primary hover:text-primary-foreground group-hover:scale-110 transition-all"
                      title="J'aime"
                    >
                      ❤️
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Section technologies utilisées */}
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-3xl sm:text-5xl mb-8 animate-fade-in-up">
              TECHNOLOGIES
              <br />
              <span className="text-primary">MAÎTRISÉES</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "AFTER EFFECTS", icon: "🎨", mastery: "MAÎTRE JEDI" },
                { name: "PREMIÈRE PRO", icon: "🎬", mastery: "EXPERT NINJA" },
                { name: "MOTION DESIGN", icon: "✨", mastery: "MAGICIEN" },
                { name: "COLOR GRADING", icon: "🌈", mastery: "ARTISTE" },
              ].map((tech, index) => (
                <Card
                  key={tech.name}
                  className={`p-6 hover:shadow-xl transition-all duration-500 animate-slide-in-left stagger-${index + 1} hover-grow hover-glow border-2 hover:border-primary/50`}
                >
                  <div className="text-4xl mb-3 animate-rotate-slow">
                    {tech.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2 text-primary">
                    {tech.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    {tech.mastery}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>

          {/* Section process créatif */}
          <div className="mb-16">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-center mb-12 animate-fade-in-up">
              MON PROCESSUS
              <br />
              <span className="text-primary animate-text-shimmer">
                CRÉATIF
              </span>{" "}
              🔥
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "BRIEF & IDÉATION",
                  description:
                    "Analyse de vos besoins et brainstorming créatif",
                  icon: "💡",
                },
                {
                  step: "02",
                  title: "CONCEPTION",
                  description:
                    "Storyboard et planification technique détaillée",
                  icon: "📝",
                },
                {
                  step: "03",
                  title: "PRODUCTION",
                  description:
                    "Montage professionnel et effets visuels épiques",
                  icon: "🎬",
                },
                {
                  step: "04",
                  title: "LIVRAISON",
                  description: "Finitions parfaites et livraison ultra-rapide",
                  icon: "🚀",
                },
              ].map((process, index) => (
                <Card
                  key={process.step}
                  className={`text-center p-6 hover:shadow-xl transition-all duration-500 animate-fade-in-up stagger-${index + 1} hover-grow hover-glow border-2 hover:border-primary/50 relative overflow-hidden`}
                >
                  <div className="absolute top-2 right-2 text-6xl opacity-10 font-black">
                    {process.step}
                  </div>
                  <div className="text-4xl mb-4 animate-bounce-slow relative z-10">
                    {process.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3 text-primary relative z-10">
                    {process.title}
                  </h3>
                  <p className="text-muted-foreground text-sm relative z-10">
                    {process.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to action final */}
          <div className="text-center animate-fade-in-up stagger-6">
            <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-2 border-primary/20 hover-glow">
              <CardContent className="p-12">
                <h2 className="font-display font-black text-3xl sm:text-4xl mb-6 text-primary animate-text-shimmer">
                  🚀 VOTRE PROJET SERA LE PROCHAIN !
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Vous avez une vision ? J'ai les compétences pour la
                  transformer en réalité virale ! Collaborons ensemble pour
                  créer quelque chose d'absolument légendaire. 🔥
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Dialog
                    open={isOrderFormOpen}
                    onOpenChange={setIsOrderFormOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        className="font-display font-bold text-lg tracking-wide px-8 py-6 rounded-full animate-pulse-glow hover-grow"
                      >
                        🎬 COMMANDER MON PROJET ÉPIQUE
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
                    variant="outline"
                    size="lg"
                    className="font-display font-bold text-lg tracking-wide px-8 py-6 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover-grow"
                  >
                    <a href="/contact">💬 DISCUTER DE MON IDÉE</a>
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

export default Works;
