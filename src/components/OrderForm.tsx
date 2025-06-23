import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sendOrderToDiscord } from "@/lib/discord";
import { useToast } from "@/hooks/use-toast";

interface OrderFormProps {
  onClose?: () => void;
}

const OrderForm = ({ onClose }: OrderFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    socialMedia: "",
    videoType: "",
    deadline: "",
    budget: "",
    description: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await sendOrderToDiscord(formData);

      if (success) {
        toast({
          title: "Commande envoyée ! 🎉",
          description:
            "Votre demande a été transmise à Ademinho. Vous recevrez une réponse sous 24h.",
        });

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          socialMedia: "",
          videoType: "",
          deadline: "",
          budget: "",
          description: "",
        });

        if (onClose) onClose();
      } else {
        throw new Error("Failed to send order");
      }
    } catch (error) {
      toast({
        title: "Erreur d'envoi",
        description:
          "Une erreur s'est produite. Veuillez réessayer ou contacter directement Ademinho.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const videoTypes = [
    "Reel Instagram",
    "Clip musical",
    "Édition YouTube",
    "TikTok",
    "Motion Design",
    "Présentation d'entreprise",
    "Publicité",
    "Autre",
  ];

  const budgetRanges = [
    "50€ - 100€",
    "100€ - 200€",
    "200€ - 500€",
    "500€ - 1000€",
    "1000€+",
    "À discuter",
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-display text-2xl font-bold tracking-tight">
          COMMANDER UNE VIDÉO 🎬
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="font-display font-semibold tracking-wide"
              >
                PRÉNOM *
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                className="font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="font-display font-semibold tracking-wide"
              >
                NOM *
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
                className="font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="font-display font-semibold tracking-wide"
            >
              EMAIL *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="socialMedia"
              className="font-display font-semibold tracking-wide"
            >
              RÉSEAUX SOCIAUX
            </Label>
            <Input
              id="socialMedia"
              placeholder="@username (Instagram, TikTok, X...)"
              value={formData.socialMedia}
              onChange={(e) => handleInputChange("socialMedia", e.target.value)}
              className="font-medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-display font-semibold tracking-wide">
                TYPE DE VIDÉO *
              </Label>
              <Select
                value={formData.videoType}
                onValueChange={(value) => handleInputChange("videoType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  {videoTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="deadline"
                className="font-display font-semibold tracking-wide"
              >
                DEADLINE *
              </Label>
              <Input
                id="deadline"
                placeholder="Ex: 7 jours, 2 semaines..."
                value={formData.deadline}
                onChange={(e) => handleInputChange("deadline", e.target.value)}
                required
                className="font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-display font-semibold tracking-wide">
              BUDGET *
            </Label>
            <Select
              value={formData.budget}
              onValueChange={(value) => handleInputChange("budget", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner votre budget..." />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="font-display font-semibold tracking-wide"
            >
              DESCRIPTION DU PROJET
            </Label>
            <Textarea
              id="description"
              placeholder="Décrivez votre projet, vos attentes, le style souhaité..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              className="font-medium"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 font-display font-bold tracking-wide"
            >
              {isSubmitting ? "ENVOI EN COURS..." : "ENVOYER LA COMMANDE"}
            </Button>
            {onClose && (
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="font-display font-semibold tracking-wide"
              >
                ANNULER
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
