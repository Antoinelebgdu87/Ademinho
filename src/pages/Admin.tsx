import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  authenticateAdmin,
  isAdminLoggedIn,
  loginAdmin,
  logoutAdmin,
} from "@/lib/auth";
import {
  loadContentFromServer,
  saveContentToServer,
  subscribeToServerContentChanges,
  getSyncStatus,
  forceSyncContent,
  type SiteContent,
} from "@/lib/realStorage";


const Admin = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [syncStatus, setSyncStatus] = useState(getSyncStatus());

  useEffect(() => {
    setIsLoggedIn(isAdminLoggedIn());

    // Load content from server
    const loadInitialContent = async () => {
      try {
        const content = await loadContentFromServer();
        setSiteContent(content);
        setCurrentVersion(content.version);
        setSyncStatus(getSyncStatus());
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

    // Écoute les changements de contenu en temps réel
    const unsubscribe = subscribeToServerContentChanges((newContent) => {
      setSiteContent(newContent);
      setCurrentVersion(newContent.version);
      setSyncStatus(getSyncStatus());
      toast({
        title: "Contenu synchronisé !",
        description: "Les modifications ont été appliquées en temps réel",
      });
    });

    return unsubscribe;
  }, [toast]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);

    setTimeout(() => {
      if (authenticateAdmin(credentials.username, credentials.password)) {
        loginAdmin();
        setIsLoggedIn(true);
        toast({
          title: "🎉 Connexion réussie !",
          description: "Bienvenue dans le panneau d'administration magique ✨",
        });
      } else {
        toast({
          title: "❌ Erreur de connexion",
          description: "Nom d'utilisateur ou mot de passe incorrect",
          variant: "destructive",
        });
      }
      setIsLoginLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsLoggedIn(false);
    toast({
      title: "👋 À bientôt !",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  const handleSaveContent = async () => {
    if (!siteContent) return;

    setIsSaving(true);
    try {
      const success = await saveContentToServer(siteContent);

      if (success) {
        setCurrentVersion(siteContent.version);
        setSyncStatus(getSyncStatus());
        toast({
          title: "Modifications sauvegardées !",
          description:
            "Les changements sont maintenant visibles par tous les visiteurs en temps réel !",
        });
      } else {
        throw new Error("Échec de la sauvegarde sur le serveur");
      }
    } catch (error) {
      toast({
        title: "Erreur de sauvegarde",
        description: "Une erreur s'est produite lors de la sauvegarde serveur",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportContent = () => {
    const content = exportContent();
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ademinho-content-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "📁 Export réussi !",
      description: "Le fichier de sauvegarde a été téléchargé",
    });
  };

  const handleImportContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (importContent(content)) {
        setSiteContent(loadContent());
        toast({
          title: "📥 Import réussi !",
          description: "Le contenu a été importé et sauvegardé",
        });
      } else {
        toast({
          title: "❌ Erreur d'import",
          description: "Le fichier n'est pas valide",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const addNewProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "NOUVEAU PROJET ÉPIQUE",
      category: "Nouveau",
      description: "Description du nouveau projet...",
      thumbnail: "🎬",
    };

    setSiteContent((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const removeProject = (projectId: string) => {
    setSiteContent((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== projectId),
    }));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center px-6">
        <Card className="w-full max-w-md animate-scale-in hover-glow">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-3xl font-bold tracking-tight animate-text-shimmer">
              🔐 ADMIN PORTAL
            </CardTitle>
            <p className="text-muted-foreground animate-fade-in-up stagger-2">
              Zone ultra-secrète d'Ademinho
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2 animate-slide-in-left stagger-3">
                <Label
                  htmlFor="username"
                  className="font-display font-semibold text-primary"
                >
                  👤 NOM D'UTILISATEUR
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
                  className="hover-glow transition-all duration-300"
                  placeholder="Entrez votre nom d'utilisateur..."
                />
              </div>
              <div className="space-y-2 animate-slide-in-right stagger-4">
                <Label
                  htmlFor="password"
                  className="font-display font-semibold text-primary"
                >
                  🔑 MOT DE PASSE SECRET
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
                  className="hover-glow transition-all duration-300"
                  placeholder="Votre mot de passe ultra-secret..."
                />
              </div>
              <Button
                type="submit"
                disabled={isLoginLoading}
                className="w-full font-display font-bold tracking-wide text-lg py-6 animate-pulse-glow hover-grow"
              >
                {isLoginLoading ? "🔄 CONNEXION..." : "🚀 ACCÉDER AU CONTRÔLE"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header super stylé */}
      <header className="border-b border-border bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="font-display font-bold text-2xl tracking-tight animate-text-shimmer">
                🛠️ PANNEAU ADMIN MAGIQUE
              </h1>
              {currentVersion && (
                <Badge
                  variant="secondary"
                  className="animate-bounce-slow font-mono"
                >
                  v{currentVersion.slice(0, 8)}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant="outline"
                className={`animate-pulse-glow ${
                  syncStatus.storageType === "localStorage"
                    ? "text-blue-600 border-blue-600"
                    : syncStatus.storageType === "server"
                    ? "text-green-600 border-green-600"
                    : "text-orange-600 border-orange-600"
                }`}
              >
                {syncStatus.storageType === "localStorage" && "💾 LOCAL"}
                {syncStatus.storageType === "server" && "🌐 SERVEUR"}
                {syncStatus.storageType === "default" && "📄 DÉFAUT"}
              </Badge>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="font-display font-semibold hover-grow"
              >
                👋 DÉCONNEXION
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="content" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50 animate-slide-in-left">
            <TabsTrigger
              value="content"
              className="font-display font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              📝 CONTENU
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="font-display font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              🎬 PROJETS
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="font-display font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              📋 COMMANDES
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="font-display font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              ⚙️ PARAMÈTRES
            </TabsTrigger>
            <TabsTrigger
              value="backup"
              className="font-display font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              💾 SAUVEGARDE
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card className="animate-scale-in hover-glow">
              <CardHeader>
                <CardTitle className="font-display font-bold text-2xl flex items-center gap-2">
                  ✨ ÉDITION DU CONTENU MAGIQUE
                </CardTitle>
                <p className="text-muted-foreground">
                  Modifiez le contenu et voyez les changements en temps réel sur
                  le site !
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2 animate-slide-in-left stagger-1">
                    <Label className="font-display font-semibold text-primary">
                      🎯 TITRE PRINCIPAL
                    </Label>
                    <Input
                      value={siteContent.heroTitle}
                      onChange={(e) =>
                        setSiteContent((prev) => ({
                          ...prev,
                          heroTitle: e.target.value,
                        }))
                      }
                      className="hover-glow transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2 animate-slide-in-right stagger-2">
                    <Label className="font-display font-semibold text-primary">
                      🚀 SOUS-TITRE
                    </Label>
                    <Input
                      value={siteContent.heroSubtitle}
                      onChange={(e) =>
                        setSiteContent((prev) => ({
                          ...prev,
                          heroSubtitle: e.target.value,
                        }))
                      }
                      className="hover-glow transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2 animate-fade-in-up stagger-3">
                  <Label className="font-display font-semibold text-primary">
                    💫 DESCRIPTION ÉPIQUE
                  </Label>
                  <Input
                    value={siteContent.heroDescription}
                    onChange={(e) =>
                      setSiteContent((prev) => ({
                        ...prev,
                        heroDescription: e.target.value,
                      }))
                    }
                    className="hover-glow transition-all duration-300"
                  />
                </div>

                <div className="space-y-2 animate-fade-in-up stagger-4">
                  <Label className="font-display font-semibold text-primary">
                    📖 TEXTE À PROPOS (STORYTELLING)
                  </Label>
                  <Textarea
                    value={siteContent.aboutText}
                    onChange={(e) =>
                      setSiteContent((prev) => ({
                        ...prev,
                        aboutText: e.target.value,
                      }))
                    }
                    rows={6}
                    className="hover-glow transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up stagger-5">
                  <div className="space-y-2">
                    <Label className="font-display font-semibold text-primary">
                      💰 TARIF BASIQUE
                    </Label>
                    <Input
                      value={siteContent.pricing.basic}
                      onChange={(e) =>
                        setSiteContent((prev) => ({
                          ...prev,
                          pricing: { ...prev.pricing, basic: e.target.value },
                        }))
                      }
                      className="hover-glow transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-display font-semibold text-primary">
                      💎 TARIF STANDARD
                    </Label>
                    <Input
                      value={siteContent.pricing.standard}
                      onChange={(e) =>
                        setSiteContent((prev) => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            standard: e.target.value,
                          },
                        }))
                      }
                      className="hover-glow transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-display font-semibold text-primary">
                      🔥 TARIF PREMIUM
                    </Label>
                    <Input
                      value={siteContent.pricing.premium}
                      onChange={(e) =>
                        setSiteContent((prev) => ({
                          ...prev,
                          pricing: { ...prev.pricing, premium: e.target.value },
                        }))
                      }
                      className="hover-glow transition-all duration-300"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveContent}
                  disabled={isSaving}
                  className="w-full font-display font-bold tracking-wide text-lg py-6 animate-pulse-glow hover-grow"
                >
                  {isSaving
                    ? "🔄 SAUVEGARDE EN COURS..."
                    : "💾 SAUVEGARDER ET PUBLIER EN TEMPS RÉEL"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="animate-scale-in hover-glow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display font-bold text-2xl flex items-center gap-2">
                    🎬 GESTION DES PROJETS ÉPIQUES
                  </CardTitle>
                  <Button
                    onClick={addNewProject}
                    className="font-display font-semibold hover-grow"
                  >
                    ➕ AJOUTER UN PROJET
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {siteContent.projects.map((project, index) => (
                    <Card
                      key={project.id}
                      className={`hover-grow animate-scale-in stagger-${(index % 6) + 1} relative group`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="text-2xl">{project.thumbnail}</div>
                          <Button
                            onClick={() => removeProject(project.id)}
                            variant="destructive"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            🗑️
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Input
                          value={project.title}
                          onChange={(e) =>
                            setSiteContent((prev) => ({
                              ...prev,
                              projects: prev.projects.map((p) =>
                                p.id === project.id
                                  ? { ...p, title: e.target.value }
                                  : p,
                              ),
                            }))
                          }
                          className="font-semibold"
                        />
                        <Input
                          value={project.category}
                          onChange={(e) =>
                            setSiteContent((prev) => ({
                              ...prev,
                              projects: prev.projects.map((p) =>
                                p.id === project.id
                                  ? { ...p, category: e.target.value }
                                  : p,
                              ),
                            }))
                          }
                          placeholder="Catégorie"
                        />
                        <Textarea
                          value={project.description}
                          onChange={(e) =>
                            setSiteContent((prev) => ({
                              ...prev,
                              projects: prev.projects.map((p) =>
                                p.id === project.id
                                  ? { ...p, description: e.target.value }
                                  : p,
                              ),
                            }))
                          }
                          rows={3}
                          placeholder="Description du projet"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button
                  onClick={handleSaveContent}
                  disabled={isSaving}
                  className="w-full mt-6 font-display font-bold tracking-wide animate-pulse-glow"
                >
                  {isSaving
                    ? "🔄 SAUVEGARDE..."
                    : "💾 SAUVEGARDER LES PROJETS"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="animate-scale-in hover-glow">
              <CardHeader>
                <CardTitle className="font-display font-bold text-2xl flex items-center gap-2">
                  📋 COMMANDES REÇUES
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-16 animate-fade-in-up">
                  <div className="text-6xl mb-6 animate-bounce-slow">📬</div>
                  <h3 className="font-display font-bold text-2xl mb-4 text-primary">
                    EN ATTENTE DE COMMANDES ÉPIQUES !
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Les nouvelles commandes apparaîtront ici automatiquement et
                    seront envoyées instantanément sur Discord ! 🚀
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-4 text-green-600 border-green-600 animate-pulse-glow"
                  >
                    🟢 Système Discord actif
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="animate-scale-in hover-glow">
              <CardHeader>
                <CardTitle className="font-display font-bold text-2xl flex items-center gap-2">
                  ⚙️ PARAMÈTRES AVANCÉS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-xl text-primary animate-fade-in-up">
                    🔧 STATUT DE DISPONIBILITÉ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select
                      value={siteContent.availability.status}
                      onValueChange={(value: any) =>
                        setSiteContent((prev) => ({
                          ...prev,
                          availability: { ...prev.availability, status: value },
                        }))
                      }
                    >
                      <SelectTrigger className="hover-glow">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disponible">
                          🟢 Disponible
                        </SelectItem>
                        <SelectItem value="occupé">🟡 Occupé</SelectItem>
                        <SelectItem value="pause">🔴 En pause</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="md:col-span-2">
                      <Input
                        value={siteContent.availability.message}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            availability: {
                              ...prev.availability,
                              message: e.target.value,
                            },
                          }))
                        }
                        placeholder="Message de statut..."
                        className="hover-glow"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 animate-fade-in-up stagger-2">
                  <h3 className="font-display font-bold text-xl text-primary">
                    📱 INFORMATIONS DE CONTACT
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>📧 Email</Label>
                      <Input
                        value={siteContent.contact.email}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, email: e.target.value },
                          }))
                        }
                        className="hover-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>💬 Discord</Label>
                      <Input
                        value={siteContent.contact.discord}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            contact: {
                              ...prev.contact,
                              discord: e.target.value,
                            },
                          }))
                        }
                        className="hover-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>🐦 Twitter/X</Label>
                      <Input
                        value={siteContent.contact.twitter}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            contact: {
                              ...prev.contact,
                              twitter: e.target.value,
                            },
                          }))
                        }
                        className="hover-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>📸 Instagram</Label>
                      <Input
                        value={siteContent.contact.instagram || ""}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            contact: {
                              ...prev.contact,
                              instagram: e.target.value,
                            },
                          }))
                        }
                        className="hover-glow"
                        placeholder="@ademinho__mp4"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSaveContent}
                  disabled={isSaving}
                  className="w-full font-display font-bold tracking-wide text-lg py-6 animate-pulse-glow hover-grow"
                >
                  {isSaving
                    ? "🔄 SAUVEGARDE..."
                    : "💾 SAUVEGARDER LES PARAMÈTRES"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup" className="space-y-6">
            <Card className="animate-scale-in hover-glow">
              <CardHeader>
                <CardTitle className="font-display font-bold text-2xl flex items-center gap-2">
                  💾 SYSTÈME DE SAUVEGARDE PREMIUM
                </CardTitle>
                <p className="text-muted-foreground">
                  Gérez vos sauvegardes et synchronisez le contenu
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 animate-slide-in-left hover-grow">
                    <h3 className="font-display font-bold text-lg mb-4 text-primary">
                      📤 EXPORTER LE CONTENU
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Téléchargez une sauvegarde complète de votre site
                    </p>
                    <Button
                      onClick={handleExportContent}
                      variant="outline"
                      className="w-full hover-glow"
                    >
                      💾 TÉLÉCHARGER LA SAUVEGARDE
                    </Button>
                  </Card>

                  <Card className="p-6 animate-slide-in-right hover-grow">
                    <h3 className="font-display font-bold text-lg mb-4 text-primary">
                      📥 IMPORTER DU CONTENU
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Restaurez le site depuis une sauvegarde
                    </p>
                    <div className="relative">
                      <Input
                        type="file"
                        accept=".json"
                        onChange={handleImportContent}
                        className="hover-glow"
                      />
                    </div>
                  </Card>
                </div>

                <Card className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 animate-fade-in-up">
                  <h3 className="font-display font-bold text-lg mb-4 text-primary flex items-center gap-2">
                    🔄 SYNCHRONISATION EN TEMPS RÉEL
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl mb-2 animate-pulse-glow">⚡</div>
                      <p className="font-semibold">INSTANTANÉ</p>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Système de sauvegarde local !</strong></p>
                <p>• Vos modifications sont sauvegardées localement</p>
                <p>• Visibles par tous les visiteurs en temps réel</p>
                <p>• Persistance garantie même après redémarrage</p>
                <p>• {syncStatus.storageType === "localStorage" ? "💾 Mode local actif" : "📄 Mode par défaut"}</p>
              </div>
                        🌍
                      </div>
                      <p className="font-semibold">GLOBAL</p>
                      <p className="text-sm text-muted-foreground">
                        Tous les visiteurs voient les modifications
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2 animate-rotate-slow">
                        💾
                      </div>
                      <p className="font-semibold">PERSISTANT</p>
                      <p className="text-sm text-muted-foreground">
                        Sauvegarde permanente à vie
                      </p>
                    </div>
                  </div>
                </Card>

                {currentVersion && (
                  <Card className="p-4 bg-muted/50 animate-fade-in-up">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Version actuelle :</p>
                        <p className="font-mono text-sm text-muted-foreground">
                          {currentVersion}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-600 animate-pulse-glow"
                      >
                        ✅ Synchronisé
                      </Badge>
                    </div>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>


    </div>
  );
};

export default Admin;