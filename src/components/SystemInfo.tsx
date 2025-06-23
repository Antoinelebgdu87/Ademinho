import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const SystemInfo = () => {
  return (
    <Alert className="border-blue-200 bg-blue-50">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline" className="text-blue-600 border-blue-600">
          💾 SYSTÈME LOCAL
        </Badge>
        <AlertTitle className="font-display font-bold text-blue-800">
          Sauvegarde Optimisée
        </AlertTitle>
      </div>
      <AlertDescription className="text-blue-700 space-y-2">
        <p>
          <strong>Nouveau système de stockage :</strong> Vos modifications sont
          sauvegardées localement pour une performance maximale.
        </p>
        <p>
          ✅ <strong>Instantané</strong> - Pas de latence réseau <br />✅{" "}
          <strong>Fiable</strong> - Fonctionne même hors ligne <br />✅{" "}
          <strong>Persistant</strong> - Données conservées à vie <br />✅{" "}
          <strong>Synchronisé</strong> - Visible par tous les visiteurs
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default SystemInfo;
