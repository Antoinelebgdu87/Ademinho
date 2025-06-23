import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { getSyncStatus } from "@/lib/realStorage";

const StorageStatus = () => {
  const [status, setStatus] = useState(getSyncStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getSyncStatus());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusInfo = () => {
    switch (status.storageType) {
      case "localStorage":
        return {
          color: "text-blue-600 border-blue-600",
          label: "💾 STOCKAGE LOCAL",
          description: "Données sauvegardées localement",
        };
      case "server":
        return {
          color: "text-green-600 border-green-600",
          label: "🌐 SERVEUR EXTERNE",
          description: "Synchronisé avec le serveur",
        };
      default:
        return {
          color: "text-orange-600 border-orange-600",
          label: "📄 MODE DÉFAUT",
          description: "Utilise le contenu par défaut",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant="outline"
        className={`animate-pulse-glow ${statusInfo.color}`}
        title={statusInfo.description}
      >
        {statusInfo.label}
      </Badge>
      <div className="text-xs text-muted-foreground">
        v{status.version.slice(0, 8)}
      </div>
    </div>
  );
};

export default StorageStatus;
