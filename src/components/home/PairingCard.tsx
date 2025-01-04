import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { StrainPairing } from "@/types/strain";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PairingVoteButtons } from "./PairingVoteButtons";
import { PairingHeader } from "./pairing-card/PairingHeader";
import { getStrainType, getStrainColor, cleanAndParseJSON } from "./pairing-card/utils";
import { usePairingActions } from "./pairing-card/usePairingActions";

interface PairingCardProps {
  pair: StrainPairing;
  onVote: (pairingId: string, isHelpful: boolean) => Promise<void>;
  isFavorited?: boolean;
}

export const PairingCard = ({ pair, onVote, isFavorited = false }: PairingCardProps) => {
  const { isLiked, handleFavorite, handleShare } = usePairingActions(pair.id, isFavorited);
  
  const pairingData = cleanAndParseJSON(pair.pairing_suggestion);
  const strainType = getStrainType(pair.strain_name);
  const iconColor = getStrainColor(strainType);
  
  if (!pairingData) {
    return (
      <Card className="w-full bg-white shadow-lg rounded-xl p-6">
        <p className="text-sage-400">Error loading pairing data</p>
      </Card>
    );
  }
  
  return (
    <Card className="w-full bg-white border-sage-100 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <PairingHeader
        strainName={pair.strain_name}
        strainType={strainType}
        iconColor={iconColor}
        dishName={pairingData.dishName}
        description={pairingData.description}
        onShare={() => handleShare(pairingData, pair.strain_name)}
        onFavorite={handleFavorite}
        isLiked={isLiked}
      />
      
      <CardContent className="p-6 pt-0 space-y-6">
        <Link to={`/recipe/${pair.id}`}>
          <Button className="w-full group" variant="outline">
            View Full Recipe
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        
        <PairingVoteButtons
          pairingId={pair.id}
          helpfulVotes={pair.helpful_votes}
          notHelpfulVotes={pair.not_helpful_votes}
          onVote={onVote}
        />
      </CardContent>
    </Card>
  );
};