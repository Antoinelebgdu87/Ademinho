import { useState, useEffect } from "react";
import { isAdminLoggedIn } from "@/lib/auth";

const KeyboardHint = () => {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show hint for 5 seconds when page loads (only if not admin)
    if (!isAdminLoggedIn()) {
      setShowHint(true);
      const timer = setTimeout(() => setShowHint(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Don't show if admin is already logged in
  if (isAdminLoggedIn()) return null;

  return (
    <>
      {showHint && (
        <div className="fixed bottom-6 left-6 z-40 animate-fade-in-up">
          <div className="bg-muted border border-border rounded-lg p-3 shadow-lg max-w-xs">
            <div className="text-sm font-medium mb-1">
              Mode éditeur disponible
            </div>
            <div className="text-xs text-muted-foreground">
              Appuyez sur{" "}
              <kbd className="px-1.5 py-0.5 bg-primary text-primary-foreground rounded text-xs font-mono">
                Ctrl+E
              </kbd>{" "}
              pour éditer le site
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default KeyboardHint;
