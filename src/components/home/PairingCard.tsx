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
      <Card className="bg-white/80 backdrop-blur-md hover:shadow-lg transition-shadow animate-fade-up">
        <CardHeader className="border-b border-sage-100">
          <div className="flex items-center gap-2 text-sage-500 mb-2">
            <Cannabis className="w-5 h-5" />
            <span className="text-sm font-medium">Strain Pairing</span>
          </div>
          <CardTitle className="text-2xl font-bold text-sage-500 flex items-center gap-2">
            {pair.strain_name} × {pairingData.dishName}
          </CardTitle>
          <PairingMetadata />
          <CardDescription className="mt-4 text-sage-400 leading-relaxed">
            {pairingData.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
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
      <Card className="bg-white/80 backdrop-blur-md hover:shadow-lg transition-shadow animate-fade-up">
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