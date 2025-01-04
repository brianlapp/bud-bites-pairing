import { Clock, Users, Utensils } from "lucide-react";

export const PairingMetadata = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-2 text-sm text-sage-400">
      <div className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        <span>30 mins</span>
      </div>
      <div className="flex items-center gap-1">
        <Users className="w-4 h-4" />
        <span>Serves 4</span>
      </div>
      <div className="flex items-center gap-1">
        <Utensils className="w-4 h-4" />
        <span>Medium</span>
      </div>
    </div>
  );
};