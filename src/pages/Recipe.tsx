import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StrainPairing } from "@/types/strain";
import { PairingAccordion } from "@/components/home/PairingAccordion";
import { PairingMetadata } from "@/components/home/PairingMetadata";
import { PairingVoteButtons } from "@/components/home/PairingVoteButtons";

const Recipe = () => {
  const { id } = useParams();

  const { data: pairing, isLoading } = useQuery({
    queryKey: ['pairing', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('strain_pairings')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as StrainPairing;
    }
  });

  const cleanAndParseJSON = (jsonString: string) => {
    try {
      const cleaned = jsonString.replace(/```json\n|\n```/g, '');
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Error parsing pairing data:', error);
      return null;
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-3xl mx-auto py-16 px-4">
        <Skeleton className="h-[600px] w-full rounded-xl" />
      </div>
    );
  }

  if (!pairing) {
    return (
      <div className="container max-w-3xl mx-auto py-16 px-4 text-center">
        <p className="text-sage-400">Recipe not found</p>
      </div>
    );
  }

  const pairingData = cleanAndParseJSON(pairing.pairing_suggestion);
  
  if (!pairingData) {
    return (
      <div className="container max-w-3xl mx-auto py-16 px-4 text-center">
        <p className="text-sage-400">Error loading recipe data</p>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-16 px-4">
      <Link to="/">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Pairings
        </Button>
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 space-y-6 border-b border-sage-100">
          <h1 className="text-2xl font-bold text-sage-500">
            {pairingData.dishName}
          </h1>
          
          <PairingMetadata />
          
          <p className="text-sage-400 text-base leading-relaxed">
            {pairingData.description}
          </p>
        </div>

        <div className="p-6 space-y-6 bg-sage-50/30">
          <PairingAccordion
            pairingReason={pairingData.pairingReason}
            recipe={pairingData.recipe}
            cookingTips={pairingData.cookingTips}
          />
          <PairingVoteButtons
            pairingId={pairing.id}
            helpfulVotes={pairing.helpful_votes}
            notHelpfulVotes={pairing.not_helpful_votes}
            onVote={async () => {}} // Implement voting logic if needed
          />
        </div>
      </div>
    </div>
  );
};

export default Recipe;