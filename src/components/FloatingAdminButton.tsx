import { useState } from "react";
import { Button } from "@/components/ui/button";
import { isAdminLoggedIn } from "@/lib/auth";

interface FloatingAdminButtonProps {
  onToggleEditor: () => void;
  isEditorActive: boolean;
}

const FloatingAdminButton = ({
  onToggleEditor,
  isEditorActive,
}: FloatingAdminButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Only show if admin is logged in
  if (!isAdminLoggedIn()) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main floating button */}
      <Button
        onClick={() => setIsVisible(!isVisible)}
        className={`w-14 h-14 rounded-full shadow-2xl font-bold text-lg transition-all duration-300 ${
          isVisible ? "rotate-45" : ""
        } ${isEditorActive ? "animate-pulse bg-green-600 hover:bg-green-700" : ""}`}
        title="Admin Tools (Ctrl+E pour éditeur)"
      >
        {isEditorActive ? "ON" : "ADMIN"}
      </Button>

      {/* Admin tools menu */}
      {isVisible && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-2 animate-scale-in">
          <Button
            onClick={onToggleEditor}
            variant={isEditorActive ? "default" : "outline"}
            className="whitespace-nowrap font-semibold shadow-lg"
            size="sm"
          >
            {isEditorActive ? "ÉDITEUR ACTIF" : "ÉDITEUR VISUEL"}
          </Button>

          <Button
            asChild
            variant="outline"
            className="whitespace-nowrap font-semibold shadow-lg"
            size="sm"
          >
            <a href="/admin">ADMIN PANEL</a>
          </Button>

          <Button
            onClick={() => {
              // Remove all emojis from the page
              const allElements = document.querySelectorAll("*");
              let count = 0;

              allElements.forEach((element) => {
                if (element.textContent) {
                  const newText = element.textContent
                    .replace(
                      /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
                      "",
                    )
                    .trim();
                  if (newText !== element.textContent) {
                    element.textContent = newText;
                    count++;
                  }
                }
              });

              alert(`${count} emojis supprimés !`);
            }}
            variant="outline"
            className="whitespace-nowrap font-semibold shadow-lg text-red-600 border-red-600 hover:bg-red-50"
            size="sm"
          >
            SUPPRIMER EMOJIS
          </Button>
        </div>
      )}
    </div>
  );
};

export default FloatingAdminButton;
