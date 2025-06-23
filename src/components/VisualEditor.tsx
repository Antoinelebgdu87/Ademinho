import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  loadContentFromServer,
  saveContentToServer,
  subscribeToServerContentChanges,
  type SiteContent,
} from "@/lib/realStorage";

interface VisualEditorProps {
  isActive: boolean;
  onToggle: () => void;
}

const VisualEditor = ({ isActive, onToggle }: VisualEditorProps) => {
  const { toast } = useToast();
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load content from server on mount
    const loadInitialContent = async () => {
      try {
        const content = await loadContentFromServer();
        setSiteContent(content);
      } catch (error) {
        console.error("Error loading content:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger le contenu depuis le serveur",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialContent();

    // Subscribe to real-time changes
    const unsubscribe = subscribeToServerContentChanges((newContent) => {
      setSiteContent(newContent);
      toast({
        title: "Contenu synchronisé",
        description: "Le site a été mis à jour en temps réel",
      });
    });

    return unsubscribe;
  }, [toast]);

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

    // Don't edit the editor itself or any editor-related elements
    if (
      target.closest(".visual-editor-panel") ||
      target.closest("[data-editor-protected]") ||
      target.closest(".fixed") ||
      target.closest("[role='dialog']") ||
      target.closest(".z-50") ||
      target.closest(".z-40") ||
      target.closest("[data-radix-popper-content-wrapper]") ||
      target.hasAttribute("data-editor-protected")
    )
      return;

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

  const updateElementText = async () => {
    const highlighted = document.querySelector(".visual-editor-highlight");
    if (highlighted && editingText.trim() && siteContent) {
      highlighted.textContent = editingText;

      // Update content based on element type
      const updatedContent = updateContentInStorage(
        highlighted as HTMLElement,
        editingText,
      );

      // Auto-save to server immediately
      setIsSaving(true);
      const success = await saveContentToServer(updatedContent);

      if (success) {
        setSiteContent(updatedContent);
        toast({
          title: "Élément modifié et sauvegardé !",
          description: "Changement visible par tous instantanément",
        });
      } else {
        toast({
          title: "Erreur de sauvegarde",
          description: "Modification locale seulement",
          variant: "destructive",
        });
      }
      setIsSaving(false);
    }
  };

  const updateContentInStorage = (
    element: HTMLElement,
    newText: string,
  ): SiteContent => {
    if (!siteContent) return siteContent as SiteContent;

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

    return newContent;
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

  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 z-50" data-editor-protected="true">
        <div className="bg-background/95 backdrop-blur-sm border-2 border-primary shadow-2xl rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="text-sm font-semibold">
              Chargement de l'éditeur...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Visual editing styles */}
      <style>{`
        .visual-editing-mode * {
          outline: 1px dashed transparent !important;
          transition: all 0.2s ease !important;
        }

        .visual-editing-mode *:hover {
          outline: 2px dashed #ED5C3B !important;
          outline-offset: 3px !important;
          cursor: pointer !important;
          background: rgba(237, 92, 59, 0.05) !important;
        }

        /* Protection des éléments de l'éditeur */
        .visual-editing-mode [data-editor-protected],
        .visual-editing-mode [data-editor-protected] *,
        .visual-editing-mode .visual-editor-panel,
        .visual-editing-mode .visual-editor-panel *,
        .visual-editing-mode .fixed,
        .visual-editing-mode .fixed *,
        .visual-editing-mode [role="dialog"],
        .visual-editing-mode [role="dialog"] *,
        .visual-editing-mode .z-50,
        .visual-editing-mode .z-50 *,
        .visual-editing-mode .z-40,
        .visual-editing-mode .z-40 * {
          outline: none !important;
          background: transparent !important;
          cursor: default !important;
          pointer-events: auto !important;
        }

        .visual-editor-highlight {
          outline: 3px solid #ED5C3B !important;
          outline-offset: 4px !important;
          background: rgba(237, 92, 59, 0.15) !important;
          box-shadow: 0 0 20px rgba(237, 92, 59, 0.3) !important;
        }

        .visual-editor-panel {
          pointer-events: auto !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
        }

        /* Indicateur visuel pour mode édition actif */
        .visual-editing-mode::before {
          content: 'MODE ÉDITION ACTIF - Cliquez sur les éléments pour les modifier';
          position: fixed;
          top: 100px;
          left: 50%;
          transform: translateX(-50%);
          background: #ED5C3B;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 14px;
          z-index: 9998;
          animation: pulse 2s infinite;
          pointer-events: none;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* Floating Editor Panel */}
      <div
        className="visual-editor-panel fixed top-4 right-4 z-50 w-80"
        data-editor-protected="true"
      >
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
                onClick={async () => {
                  if (!siteContent) return;
                  setIsSaving(true);
                  const success = await saveContentToServer(siteContent);
                  setIsSaving(false);

                  if (success) {
                    toast({
                      title: "Sauvegardé sur le serveur !",
                      description:
                        "Toutes les modifications sont permanentes pour tous",
                    });
                  } else {
                    toast({
                      title: "Erreur de sauvegarde",
                      description: "Impossible de sauvegarder sur le serveur",
                      variant: "destructive",
                    });
                  }
                }}
                disabled={isSaving || !siteContent}
                className="w-full text-xs font-bold"
              >
                {isSaving ? "SAUVEGARDE..." : "SAUVEGARDER SUR SERVEUR"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default VisualEditor;
