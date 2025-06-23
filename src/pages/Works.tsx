import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

const Works = () => {
  const projects = [
    {
      id: 1,
      title: "REEL INSTAGRAM VIRAL",
      category: "Social Media",
      description: "Reel Instagram qui a atteint 2M+ de vues",
      thumbnail: "🎥",
    },
    {
      id: 2,
      title: "CLIP MUSICAL",
      category: "Music Video",
      description: "Montage dynamique pour artiste émergent",
      thumbnail: "🎵",
    },
    {
      id: 3,
      title: "ÉDITION YOUTUBE",
      category: "YouTube",
      description: "Série de vlogs avec +500K vues",
      thumbnail: "📺",
    },
    {
      id: 4,
      title: "MOTION DESIGN",
      category: "Animation",
      description: "Logo animé et transitions custom",
      thumbnail: "✨",
    },
    {
      id: 5,
      title: "TIKTOK VIRAL",
      category: "TikTok",
      description: "Contenu viral avec 5M+ de vues",
      thumbnail: "📱",
    },
    {
      id: 6,
      title: "PUBLICITÉ",
      category: "Commercial",
      description: "Spot publicitaire pour marque de mode",
      thumbnail: "🎬",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-20 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight mb-6">
              MES
              <br />
              <span className="text-primary">RÉALISATIONS</span> 🎬
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez une sélection de mes meilleurs projets de montage vidéo
              et motion design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-video bg-muted flex items-center justify-center text-6xl">
                  {project.thumbnail}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-display font-semibold tracking-wider text-primary uppercase">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg tracking-wide mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full font-display font-semibold tracking-wide"
                  >
                    VOIR LE PROJET
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <h2 className="font-display font-bold text-3xl tracking-wide mb-6">
              VOUS AVEZ UN PROJET EN TÊTE ?
            </h2>
            <p className="text-muted-foreground mb-8">
              Collaborons ensemble pour créer du contenu exceptionnel
            </p>
            <Button
              size="lg"
              className="font-display font-bold text-lg tracking-wide px-8 py-6 rounded-full"
            >
              DISCUTONS DE VOTRE PROJET
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Works;
