import { Clock, Users, Utensils } from "lucide-react";

export const PairingMetadata = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-sage-50 rounded-lg">
          <Clock className="w-4 h-4 text-sage-500" />
        </div>
        <span className="text-sm font-medium text-sage-400">30 mins</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-sage-50 rounded-lg">
          <Users className="w-4 h-4 text-sage-500" />
        </div>
        <span className="text-sm font-medium text-sage-400">Serves 4</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-sage-50 rounded-lg">
          <Utensils className="w-4 h-4 text-sage-500" />
        </div>
        <span className="text-sm font-medium text-sage-400">Medium</span>
      </div>
    </div>
  );
};