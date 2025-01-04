import { Cannabis, Clock, Users, Utensils } from "lucide-react";
import { StrainPairing } from "@/types/strain";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
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
      <Card className="w-full bg-white shadow-lg rounded-xl overflow-hidden border border-sage-100 hover:shadow-xl transition-all duration-300">
        <CardHeader className="p-6 pb-4 space-y-4 border-b border-sage-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-sage-50 rounded-full">
                <Cannabis className="w-5 h-5 text-sage-500" />
              </div>
              <h3 className="text-lg font-semibold text-sage-500">
                {pair.strain_name}
              </h3>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-sage-500">
              {pairingData.dishName}
            </h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-sage-50 rounded-lg">
                  <Clock className="w-4 h-4 text-sage-500" />
                </div>
                <span className="text-sm text-sage-400">30 mins</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-sage-50 rounded-lg">
                  <Users className="w-4 h-4 text-sage-500" />
                </div>
                <span className="text-sm text-sage-400">Serves 4</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-sage-50 rounded-lg">
                  <Utensils className="w-4 h-4 text-sage-500" />
                </div>
                <span className="text-sm text-sage-400">Medium</span>
              </div>
            </div>
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
    console.error('Error parsing pairing data:', error);
    return (
      <Card className="w-full bg-white shadow-lg rounded-xl p-6">
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