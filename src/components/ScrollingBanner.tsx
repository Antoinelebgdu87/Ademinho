const ScrollingBanner = () => {
  const services = [
    "REELS INSTAGRAM",
    "CLIPS MUSICAUX",
    "ÉDITION YOUTUBE",
    "TIKTOKS VIRAUX",
    "MOTION DESIGN",
    "AFTER EFFECTS",
    "PREMIÈRE PRO",
    "MONTAGE VIDÉO",
    "CONTENU CRÉATIF",
    "ANIMATIONS 2D",
    "TRANSITIONS",
    "COLOR GRADING",
  ];

  return (
    <div className="relative overflow-hidden bg-primary text-primary-foreground py-4">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...services, ...services, ...services].map((service, index) => (
          <span
            key={index}
            className="inline-block px-8 font-display font-bold text-lg tracking-wider"
          >
            {service} •
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ScrollingBanner;
