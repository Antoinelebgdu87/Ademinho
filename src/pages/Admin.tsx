import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  authenticateAdmin,
  isAdminLoggedIn,
  loginAdmin,
  logoutAdmin,
} from "@/lib/auth";

const Admin = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [siteData, setSiteData] = useState({
    heroTitle: "SALUT, MOI C'EST ADEMINHO 🇧🇷",
    heroSubtitle: "MONTEUR VIDÉO & CRÉATEUR DE CONTENU",
    heroDescription: "SPÉCIALISÉ EN AFTER EFFECTS & PREMIÈRE PRO",
    aboutText:
      "Passionné de montage vidéo depuis mes débuts, j'ai développé une expertise unique...",
    pricing: {
      basic: "50€ - 100€",
      standard: "100€ - 200€",
      premium: "200€ - 500€",
    },
  });

  useEffect(() => {
    setIsLoggedIn(isAdminLoggedIn());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (authenticateAdmin(credentials.username, credentials.password)) {
      loginAdmin();
      setIsLoggedIn(true);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'interface d'administration",
      });
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Nom d'utilisateur ou mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsLoggedIn(false);
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to a database
    toast({
      title: "Modifications sauvegardées",
      description: "Les changements ont été appliqués au site",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-display text-2xl font-bold tracking-tight text-center">
              ADMIN LOGIN 🔐
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="font-display font-semibold"
                >
                  NOM D'UTILISATEUR
                </Label>
                <Input
                  id="username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="font-display font-semibold"
                >
                  MOT DE PASSE
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full font-display font-bold tracking-wide"
              >
                SE CONNECTER
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-display font-bold text-xl tracking-tight">
              ADMIN PANEL 🛠️
            </h1>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="font-display font-semibold"
            >
              DÉCONNEXION
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="content" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content" className="font-display font-semibold">
              CONTENU
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="font-display font-semibold"
            >
              PROJETS
            </TabsTrigger>
            <TabsTrigger value="orders" className="font-display font-semibold">
              COMMANDES
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="font-display font-semibold"
            >
              PARAMÈTRES
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-display font-bold text-xl">
                  ÉDITION DU CONTENU
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="font-display font-semibold">
                    TITRE PRINCIPAL
                  </Label>
                  <Input
                    value={siteData.heroTitle}
                    onChange={(e) =>
                      setSiteData((prev) => ({
                        ...prev,
                        heroTitle: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-display font-semibold">
                    SOUS-TITRE
                  </Label>
                  <Input
                    value={siteData.heroSubtitle}
                    onChange={(e) =>
                      setSiteData((prev) => ({
                        ...prev,
                        heroSubtitle: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-display font-semibold">
                    DESCRIPTION
                  </Label>
                  <Input
                    value={siteData.heroDescription}
                    onChange={(e) =>
                      setSiteData((prev) => ({
                        ...prev,
                        heroDescription: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-display font-semibold">
                    TEXTE À PROPOS
                  </Label>
                  <Textarea
                    value={siteData.aboutText}
                    onChange={(e) =>
                      setSiteData((prev) => ({
                        ...prev,
                        aboutText: e.target.value,
                      }))
                    }
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleSaveChanges}
                  className="font-display font-bold tracking-wide"
                >
                  SAUVEGARDER LES MODIFICATIONS
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-display font-bold text-xl">
                  GESTION DES PROJETS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🚧</div>
                  <h3 className="font-display font-bold text-xl mb-2">
                    EN DÉVELOPPEMENT
                  </h3>
                  <p className="text-muted-foreground">
                    La gestion des projets sera bientôt disponible
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-display font-bold text-xl">
                  COMMANDES REÇUES
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="font-display font-bold text-xl mb-2">
                    AUCUNE COMMANDE
                  </h3>
                  <p className="text-muted-foreground">
                    Les nouvelles commandes apparaîtront ici et seront envoyées
                    sur Discord
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-display font-bold text-xl">
                  TARIFS ET DISPONIBILITÉ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="font-display font-semibold">
                      TARIF BASIQUE
                    </Label>
                    <Input
                      value={siteData.pricing.basic}
                      onChange={(e) =>
                        setSiteData((prev) => ({
                          ...prev,
                          pricing: { ...prev.pricing, basic: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-display font-semibold">
                      TARIF STANDARD
                    </Label>
                    <Input
                      value={siteData.pricing.standard}
                      onChange={(e) =>
                        setSiteData((prev) => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            standard: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-display font-semibold">
                      TARIF PREMIUM
                    </Label>
                    <Input
                      value={siteData.pricing.premium}
                      onChange={(e) =>
                        setSiteData((prev) => ({
                          ...prev,
                          pricing: { ...prev.pricing, premium: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display font-bold text-lg">
                    STATUT DISPONIBILITÉ
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-display font-semibold">
                      DISPONIBLE
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleSaveChanges}
                  className="font-display font-bold tracking-wide"
                >
                  SAUVEGARDER LES PARAMÈTRES
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
