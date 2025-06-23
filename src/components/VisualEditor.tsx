import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { loadContent, saveContent, type SiteContent } from "@/lib/storage";

interface VisualEditorProps {
  isActive: boolean;
  onToggle: () => void;
}

const VisualEditor = ({ isActive, onToggle }: VisualEditorProps) => {
  const { toast } = useToast();
  const [siteContent, setSiteContent] = useState<SiteContent>(loadContent());
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    if (isActive) {
      // Add visual editing indicators
      document.body.classList.add("visual-editing-mode");
      addEditingListeners();
    } else {
      document.body.classList.remove("visual-editing-mode");
      removeEditingListeners();
    }

    return () => {
      document.body.classList.remove("visual-editing-mode");
      removeEditingListeners();
    };
  }, [isActive]);

  const addEditingListeners = () => {
    document.addEventListener("click", handleElementClick);
  };

  const removeEditingListeners = () => {
    document.removeEventListener("click", handleElementClick);
  };

  const handleElementClick = (e: MouseEvent) => {
    if (!isActive) return;

    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLElement;

    // Don't edit the editor itself
    if (target.closest(".visual-editor-panel")) return;

    // Find editable elements
    const editableSelectors = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "span",
      'div[data-editable="true"]',
      ".font-display",
      ".text-primary",
    ];

    let editableElement = target;

    // Find the closest editable element
    for (const selector of editableSelectors) {
      const closest = target.closest(selector);
      if (closest) {
        editableElement = closest as HTMLElement;
        break;
      }
    }

    if (editableElement) {
      highlightElement(editableElement);
      setSelectedElement(
        editableElement.tagName +
          ":" +
          editableElement.textContent?.slice(0, 20),
      );
      setEditingText(editableElement.textContent || "");
    }
  };

  const highlightElement = (element: HTMLElement) => {
    // Remove previous highlights
    document.querySelectorAll(".visual-editor-highlight").forEach((el) => {
      el.classList.remove("visual-editor-highlight");
    });

    // Add highlight to current element
    element.classList.add("visual-editor-highlight");
  };

  const updateElementText = () => {
    const highlighted = document.querySelector(".visual-editor-highlight");
    if (highlighted && editingText.trim()) {
      highlighted.textContent = editingText;

      // Update content based on element type
      updateContentInStorage(highlighted as HTMLElement, editingText);

      toast({
        title: "✅ Élément modifié !",
        description: "Le changement est visible en temps réel",
      });
    }
  };

  const updateContentInStorage = (element: HTMLElement, newText: string) => {
    const newContent = { ...siteContent };

    // Detect what type of content this is based on context
    const text = element.textContent?.toLowerCase() || "";

    if (text.includes("ademinho") || element.closest("h1")) {
      newContent.heroTitle = newText;
    } else if (text.includes("monteur") || text.includes("créateur")) {
      newContent.heroSubtitle = newText;
    } else if (text.includes("after effects") || text.includes("première")) {
      newContent.heroDescription = newText;
    } else if (element.closest("p") && text.length > 50) {
      newContent.aboutText = newText;
    }

    setSiteContent(newContent);
    saveContent(newContent);
  };

  const removeElement = () => {
    const highlighted = document.querySelector(".visual-editor-highlight");
    if (highlighted) {
      highlighted.remove();
      setSelectedElement(null);
      setEditingText("");

      toast({
        title: "🗑️ Élément supprimé !",
        description: "L'élément a été retiré du site",
      });
    }
  };

  const removeAllEmojis = () => {
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

    toast({
      title: "Emojis supprimés !",
      description: `${count} emojis ont été retirés du site`,
    });
  };

  const addElement = (type: "text" | "heading" | "button") => {
    const highlighted = document.querySelector(".visual-editor-highlight");
    if (!highlighted) return;

    let newElement: HTMLElement;

    switch (type) {
      case "heading":
        newElement = document.createElement("h3");
        newElement.className = "font-display font-bold text-xl text-primary";
        newElement.textContent = "NOUVEAU TITRE";
        break;
      case "text":
        newElement = document.createElement("p");
        newElement.className = "text-muted-foreground";
        newElement.textContent = "Nouveau texte...";
        break;
      case "button":
        newElement = document.createElement("button");
        newElement.className =
          "bg-primary text-primary-foreground px-4 py-2 rounded font-semibold";
        newElement.textContent = "NOUVEAU BOUTON";
        break;
      default:
        return;
    }

    highlighted.parentNode?.insertBefore(newElement, highlighted.nextSibling);

    toast({
      title: "➕ Élément ajouté !",
      description: `Nouveau ${type} ajouté au site`,
    });
  };

  if (!isActive) return null;

  return (
    <>
      {/* Visual editing styles */}
      <style>{`
        .visual-editing-mode * {
          outline: 1px dashed transparent !important;
          transition: outline 0.2s ease !important;
        }

        .visual-editing-mode *:hover {
          outline: 2px dashed #ED5C3B !important;
          outline-offset: 2px !important;
          cursor: pointer !important;
        }

        .visual-editor-highlight {
          outline: 3px solid #ED5C3B !important;
          outline-offset: 4px !important;
          background: rgba(237, 92, 59, 0.1) !important;
        }

        .visual-editor-panel {
          pointer-events: auto !important;
        }
      `}</style>

      {/* Floating Editor Panel */}
      <div className="visual-editor-panel fixed top-4 right-4 z-50 w-80">
        <Card className="bg-background/95 backdrop-blur-sm border-2 border-primary shadow-2xl">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="default" className="font-bold">
                MODE ÉDITEUR VISUEL
              </Badge>
              <Button
                size="sm"
                variant="outline"
                onClick={onToggle}
                className="font-semibold"
              >
                FERMER
              </Button>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Mode édition activé !</strong>
              </p>
              <p>• Cliquez sur un texte pour l'éditer</p>
              <p>• Survolez pour voir les éléments éditables</p>
              <p>• Toutes modifications sont sauvegardées automatiquement</p>
            </div>

            {selectedElement && (
              <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
                <div className="text-sm font-semibold text-primary">
                  Élément sélectionné: {selectedElement}
                </div>

                <Textarea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  placeholder="Modifier le texte..."
                  className="resize-none"
                  rows={3}
                />

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={updateElementText}
                    className="flex-1 text-xs"
                  >
                    APPLIQUER
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={removeElement}
                    className="text-xs"
                  >
                    SUPPRIMER
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="text-sm font-semibold">Actions rapides:</div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addElement("heading")}
                  className="text-xs"
                >
                  AJOUTER TITRE
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addElement("text")}
                  className="text-xs"
                >
                  AJOUTER TEXTE
                </Button>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={removeAllEmojis}
                className="w-full text-xs"
              >
                SUPPRIMER TOUS LES EMOJIS
              </Button>

              <Button
                size="sm"
                onClick={() => {
                  saveContent(siteContent);
                  toast({
                    title: "Sauvegardé !",
                    description: "Toutes les modifications sont permanentes",
                  });
                }}
                className="w-full text-xs font-bold"
              >
                SAUVEGARDER TOUT
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default VisualEditor;
