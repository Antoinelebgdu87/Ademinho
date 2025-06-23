import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { authenticateAdmin, loginAdmin } from "@/lib/auth";

interface QuickLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const QuickLogin = ({ isOpen, onClose, onSuccess }: QuickLoginProps) => {
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Petit délai pour l'effet visuel
    setTimeout(() => {
      if (authenticateAdmin(credentials.username, credentials.password)) {
        loginAdmin();
        onSuccess();
        onClose();
        setCredentials({ username: "", password: "" });
        toast({
          title: "Accès autorisé !",
          description: "Mode éditeur visuel activé",
        });
      } else {
        toast({
          title: "Accès refusé",
          description: "Identifiants incorrects",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4 animate-scale-in">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl font-bold tracking-tight">
            ACCÈS ÉDITEUR VISUEL
          </CardTitle>
          <p className="text-muted-foreground">
            Entrez vos identifiants pour activer le mode édition
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="quick-username"
                className="font-display font-semibold"
              >
                NOM D'UTILISATEUR
              </Label>
              <Input
                id="quick-username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                required
                placeholder="Admin12"
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="quick-password"
                className="font-display font-semibold"
              >
                MOT DE PASSE
              </Label>
              <Input
                id="quick-password"
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
                placeholder="Acces4455511555"
                className="font-mono"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 font-display font-bold tracking-wide"
              >
                {isLoading ? "VÉRIFICATION..." : "ACTIVER L'ÉDITEUR"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="font-display font-semibold"
              >
                ANNULER
              </Button>
            </div>
          </form>
          <div className="mt-4 text-xs text-muted-foreground text-center">
            Utilisez Ctrl+E pour accéder rapidement à l'éditeur
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickLogin;
