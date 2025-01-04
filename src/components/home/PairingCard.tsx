import { Cannabis } from "lucide-react";
import { StrainPairing } from "@/types/strain";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { PairingMetadata } from "./PairingMetadata";
import { PairingAccordion } from "./PairingAccordion";
import { PairingVoteButtons } from "./PairingVoteButtons";

interface PairingCardProps {
  pair: StrainPairing;
  onVote: (pairingId: string, isHelpful: boolean) => Promise<void>;
}

export const PairingCard = ({ pair, onVote }: PairingCardProps) => {
  try {
    const pairingData = JSON.parse(pair.pairing_suggestion);
    return (
      <Card className="bg-white border border-sage-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden">
        <CardHeader className="space-y-6 p-6 border-b border-sage-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sage-50 rounded-full">
                <Cannabis className="w-5 h-5 text-sage-500" />
              </div>
              <span className="text-sm font-medium text-sage-500">Strain Pairing</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-sage-500 leading-tight">
              {pair.strain_name} × {pairingData.dishName}
            </h3>
            <PairingMetadata />
          </div>
          
          <p className="text-sage-400 text-sm leading-relaxed">
            {pairingData.description}
          </p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <PairingAccordion
            pairingReason={pairingData.pairingReason}
            recipe={pairingData.recipe}
            cookingTips={pairingData.cookingTips}
          />
          <PairingVoteButtons
            pairingId={pair.id}
            helpfulVotes={pair.helpful_votes}
            notHelpfulVotes={pair.not_helpful_votes}
            onVote={onVote}
          />
        </CardContent>
      </Card>
    );
  } catch (error) {
    return (
      <Card className="bg-white border border-sage-100 shadow-sm rounded-2xl p-6">
        <CardHeader>
          <h3 className="text-xl font-semibold text-sage-500">{pair.strain_name}</h3>
          <p className="text-sage-400 text-sm">{pair.pairing_suggestion}</p>
        </CardHeader>
        <CardContent>
          <PairingVoteButtons
            pairingId={pair.id}
            helpfulVotes={pair.helpful_votes}
            notHelpfulVotes={pair.not_helpful_votes}
            onVote={onVote}
          />
        </CardContent>
      </Card>
    );
  }
};