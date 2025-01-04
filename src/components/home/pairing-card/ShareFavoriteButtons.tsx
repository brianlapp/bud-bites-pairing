import { Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareFavoriteButtonsProps {
  onShare: () => void;
  onFavorite: () => void;
  isLiked: boolean;
}

export const ShareFavoriteButtons = ({
  onShare,
  onFavorite,
  isLiked,
}: ShareFavoriteButtonsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onShare}
        className="text-sage-400 hover:text-sage-500"
      >
        <Share2 className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onFavorite}
        className={`${isLiked ? 'text-red-500' : 'text-sage-400'} hover:text-red-500`}
      >
        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
      </Button>
    </div>
  );
};