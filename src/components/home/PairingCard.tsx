import { Cannabis } from "lucide-react";
import { StrainPairing } from "@/types/strain";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
      <Card className="relative overflow-hidden bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 animate-fade-up">
        <CardHeader className="space-y-4 pb-6 border-b border-sage-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sage-50 rounded-full">
              <Cannabis className="w-5 h-5 text-sage-500" />
            </div>
            <span className="text-sm font-medium text-sage-500">Strain Pairing</span>
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-sage-500">
              {pair.strain_name} × {pairingData.dishName}
            </CardTitle>
            <PairingMetadata />
          </div>
          
          <CardDescription className="text-sage-400 leading-relaxed">
            {pairingData.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-6">
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
      <Card className="bg-white shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-sage-500">{pair.strain_name}</CardTitle>
          <CardDescription className="text-sage-400">{pair.pairing_suggestion}</CardDescription>
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