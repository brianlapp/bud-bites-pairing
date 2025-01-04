import { Cannabis, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { StrainPairing } from "@/types/strain";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PairingCardProps {
  pair: StrainPairing;
}

export const PairingCard = ({ pair }: PairingCardProps) => {
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
          
          <p className="text-sage-400 text-base leading-relaxed line-clamp-2">
            {pairingData.description}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-0">
        <Link to={`/recipe/${pair.id}`}>
          <Button className="w-full group" variant="outline">
            View Full Recipe
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};