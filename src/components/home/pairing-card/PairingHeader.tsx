import { Cannabis } from "lucide-react";
import { CardHeader } from "@/components/ui/card";
import { ShareFavoriteButtons } from "./ShareFavoriteButtons";

interface PairingHeaderProps {
  strainName: string;
  strainType: 'sativa' | 'indica' | 'hybrid';
  iconColor: string;
  dishName: string;
  description: string;
  onShare: () => void;
  onFavorite: () => void;
  isLiked: boolean;
}

export const PairingHeader = ({
  strainName,
  strainType,
  iconColor,
  dishName,
  description,
  onShare,
  onFavorite,
  isLiked,
}: PairingHeaderProps) => {
  return (
    <CardHeader className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sage-50 rounded-full">
            <Cannabis className={`w-5 h-5 ${iconColor}`} />
          </div>
          <h3 className="text-lg font-semibold text-sage-500">
            {strainName}
          </h3>
        </div>
        <ShareFavoriteButtons 
          onShare={onShare}
          onFavorite={onFavorite}
          isLiked={isLiked}
        />
      </div>
      
      <div className="space-y-4">
        <h4 className="text-2xl font-bold text-sage-500">
          {dishName}
        </h4>
        
        <p className="text-sage-400 text-base leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </CardHeader>
  );
};