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
  const cleanAndParseJSON = (jsonString: string) => {
    try {
      // Remove markdown backticks and 'json' label if present
      const cleaned = jsonString.replace(/```json\n|\n```/g, '');
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Error parsing pairing data:', error);
      return null;
    }
  };

  const pairingData = cleanAndParseJSON(pair.pairing_suggestion);
  
  if (!pairingData) {
    return (
      <Card className="w-full bg-white shadow-lg rounded-xl p-6">
        <p className="text-sage-400">Error loading pairing data</p>
      </Card>
    );
  }
  
  return (
    <Card className="w-full bg-white border-sage-100 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardHeader className="p-6 space-y-6 border-b border-sage-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sage-50 rounded-full">
            <Cannabis className="w-5 h-5 text-sage-500" />
          </div>
          <h3 className="text-lg font-semibold text-sage-500">
            {pair.strain_name}
          </h3>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-2xl font-bold text-sage-500">
            {pairingData.dishName}
          </h4>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-sage-50 rounded-full">
                <Clock className="w-4 h-4 text-sage-500" />
              </div>
              <span className="text-sm font-medium text-sage-400">30 mins</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-sage-50 rounded-full">
                <Users className="w-4 h-4 text-sage-500" />
              </div>
              <span className="text-sm font-medium text-sage-400">Serves 4</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-sage-50 rounded-full">
                <Utensils className="w-4 h-4 text-sage-500" />
              </div>
              <span className="text-sm font-medium text-sage-400">Medium</span>
            </div>
          </div>
          
          <p className="text-sage-400 text-base leading-relaxed">
            {pairingData.description}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6 bg-sage-50/30">
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
};