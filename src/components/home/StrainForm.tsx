import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { generateMealPairing } from "@/utils/openai";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { PairingInput } from "./PairingInput";
import { PairingExplanation } from "./PairingExplanation";
import { RecipeCard } from "./RecipeCard";
import { cleanAndParseJSON } from "@/utils/pairingUtils";
import type { PairingFormState } from "@/types/pairing";

const StrainForm = () => {
  const [formState, setFormState] = useState<PairingFormState>({
    strain: "",
    isLoading: false,
    pairing: null
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const suggestion = await generateMealPairing(formState.strain);
      
      const { error } = await supabase
        .from('strain_pairings')
        .insert([
          { strain_name: formState.strain, pairing_suggestion: suggestion }
        ]);

      if (error) throw error;

      setFormState(prev => ({ ...prev, pairing: suggestion }));
      
      toast({
        title: "Pairing Generated!",
        description: "Your meal pairing has been generated and saved successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ['recent-pairings'] });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate or save pairing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Card className="bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="pt-6">
          <PairingInput
            strain={formState.strain}
            isLoading={formState.isLoading}
            onStrainChange={(value) => setFormState(prev => ({ ...prev, strain: value }))}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>

      {formState.pairing && (() => {
        const pairingData = cleanAndParseJSON(formState.pairing);
        if (!pairingData) return null;

        return (
          <div className="mt-8 space-y-6">
            <PairingExplanation 
              strain={formState.strain} 
              pairingData={pairingData} 
            />
            <RecipeCard pairingData={pairingData} />
          </div>
        );
      })()}
    </div>
  );
};

export { StrainForm };