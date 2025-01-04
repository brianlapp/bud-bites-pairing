import { Cannabis, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { StrainPairing } from "@/types/strain";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PairingVoteButtons } from "./PairingVoteButtons";

interface PairingCardProps {
  pair: StrainPairing;
  onVote: (pairingId: string, isHelpful: boolean) => Promise<void>;
}

const getStrainType = (strainName: string): 'sativa' | 'indica' | 'hybrid' => {
  const lowerName = strainName.toLowerCase();
  if (lowerName.includes('sativa')) return 'sativa';
  if (lowerName.includes('indica')) return 'indica';
  return 'hybrid';
};

const getStrainColor = (type: 'sativa' | 'indica' | 'hybrid'): string => {
  switch (type) {
    case 'sativa':
      return 'text-coral-500'; // Using our site's coral color for sativa
    case 'indica':
      return 'text-indigo-500'; // Using indigo for indica
    case 'hybrid':
      return 'text-sage-500'; // Keep existing green color for hybrid
    default:
      return 'text-sage-500';
  }
};

export const PairingCard = ({ pair, onVote }: PairingCardProps) => {
  const cleanAndParseJSON = (jsonString: string) => {
    try {
      const cleaned = jsonString.replace(/```json\n|\n```/g, '');
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Error parsing pairing data:', error);
      return null;
    }
  };

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
      <CardHeader className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sage-50 rounded-full">
            <Cannabis className={`w-5 h-5 ${iconColor}`} />
          </div>
          <h3 className="text-lg font-semibold text-sage-500">
            {pair.strain_name}
          </h3>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-2xl font-bold text-sage-500">
            {pairingData.dishName}
          </h4>
          
          <p className="text-sage-400 text-base leading-relaxed line-clamp-2">
            {pairingData.description}
          </p>
        </div>
      </CardHeader>
      
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