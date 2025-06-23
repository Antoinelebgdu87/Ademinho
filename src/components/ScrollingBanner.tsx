import { useEffect, useState } from "react";
import {
  loadContent,
  subscribeToContentChanges,
  type SiteContent,
} from "@/lib/storage";

const ScrollingBanner = () => {
  const [siteContent, setSiteContent] = useState<SiteContent>(loadContent());

  useEffect(() => {
    // Écoute les changements de contenu en temps réel
    const unsubscribe = subscribeToContentChanges((newContent) => {
      setSiteContent(newContent);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary via-purple-500 to-primary text-primary-foreground py-6 hover:shadow-xl transition-shadow duration-300">
      {/* Effet de brillance animé */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gradient opacity-30"></div>

      <div className="flex animate-scroll whitespace-nowrap relative z-10">
        {/* Triple le contenu pour un défilement infini sans coupures */}
        {[
          ...siteContent.services,
          ...siteContent.services,
          ...siteContent.services,
        ].map((service, index) => (
          <span
            key={index}
            className="inline-block px-12 font-display font-black text-lg lg:text-xl tracking-wider hover:scale-110 transition-transform cursor-pointer"
          >
            {service} ✨
          </span>
        ))}
      </div>

      {/* Dégradés sur les bords pour effet de fondu */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary to-transparent pointer-events-none"></div>
    </div>
  );
};

export default ScrollingBanner;
