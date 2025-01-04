import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StrainPairing } from "@/types/strain";
import { motion } from "framer-motion";
import { RecipeHero } from "@/components/recipe/RecipeHero";
import { RecipeContent } from "@/components/recipe/RecipeContent";

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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-white via-sage-50/50 to-sage-100/30 rounded-3xl shadow-xl overflow-hidden border border-sage-100 transform hover:scale-[1.02] transition-all duration-300"
      >
        <RecipeHero 
          dishName={pairingData.dishName}
          description={pairingData.description}
        />
        
        <RecipeContent 
          strain={pairing.strain_name}
          pairingData={pairingData}
          pairingId={pairing.id}
          helpfulVotes={pairing.helpful_votes}
          notHelpfulVotes={pairing.not_helpful_votes}
          onVote={async () => {}} // Implement voting logic if needed
        />
      </motion.div>
    </div>
  );
};

export default Recipe;