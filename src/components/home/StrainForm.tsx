import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { generateMealPairing, generateCannabisRecipe } from "@/utils/openai";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { PairingInput } from "./PairingInput";
import { RecipeCard } from "./RecipeCard";
import { CannabisRecipeCard } from "./CannabisRecipeCard";
import { cleanAndParseJSON } from "@/utils/pairingUtils";
import type { PairingFormState } from "@/types/pairing";
import type { CannabisFormState } from "@/types/cannabis-recipe";

const StrainForm = () => {
  const [mode, setMode] = useState<'pair' | 'cook'>('pair');
  const [pairingState, setPairingState] = useState<PairingFormState>({
    strain: "",
    isLoading: false,
    pairing: null
  });
  
  const [cannabisState, setCannabisState] = useState<CannabisFormState>({
    productType: "",
    desiredDish: "",
    potencyLevel: "",
    isLoading: false,
    recipe: null
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'pair') {
      setPairingState(prev => ({ ...prev, isLoading: true }));
      try {
        const suggestion = await generateMealPairing(pairingState.strain);
        
        const { error } = await supabase
          .from('strain_pairings')
          .insert([
            { strain_name: pairingState.strain, pairing_suggestion: suggestion }
          ]);

        if (error) throw error;

        setPairingState(prev => ({ ...prev, pairing: suggestion }));
        
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
        setPairingState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setCannabisState(prev => ({ ...prev, isLoading: true }));
      try {
        const recipe = await generateCannabisRecipe(
          cannabisState.productType,
          cannabisState.desiredDish,
          cannabisState.potencyLevel
        );

        setCannabisState(prev => ({ ...prev, recipe }));
        
        toast({
          title: "Recipe Generated!",
          description: "Your cannabis recipe has been generated successfully.",
        });
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Failed to generate recipe. Please try again.",
          variant: "destructive",
        });
      } finally {
        setCannabisState(prev => ({ ...prev, isLoading: false }));
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Card className="bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-sage-900/80 dark:border-sage-700">
        <CardContent className="pt-6">
          <PairingInput
            strain={pairingState.strain}
            isLoading={pairingState.isLoading || cannabisState.isLoading}
            onStrainChange={(value) => setPairingState(prev => ({ ...prev, strain: value }))}
            onSubmit={handleSubmit}
            mode={mode}
            onModeChange={setMode}
            productType={cannabisState.productType}
            desiredDish={cannabisState.desiredDish}
            potencyLevel={cannabisState.potencyLevel}
            onProductTypeChange={(value) => setCannabisState(prev => ({ ...prev, productType: value }))}
            onDesiredDishChange={(value) => setCannabisState(prev => ({ ...prev, desiredDish: value }))}
            onPotencyLevelChange={(value) => setCannabisState(prev => ({ ...prev, potencyLevel: value }))}
          />
        </CardContent>
      </Card>

      {mode === 'pair' && pairingState.pairing && (() => {
        const pairingData = cleanAndParseJSON(pairingState.pairing);
        if (!pairingData) return null;

        return (
          <div className="mt-8 space-y-6">
            <RecipeCard 
              strain={pairingState.strain}
              pairingData={pairingData} 
            />
          </div>
        );
      })()}

      {mode === 'cook' && cannabisState.recipe && (() => {
        const recipeData = cleanAndParseJSON(cannabisState.recipe);
        if (!recipeData) return null;

        return (
          <div className="mt-8 space-y-6">
            <CannabisRecipeCard recipe={recipeData} />
          </div>
        );
      })()}
    </div>
  );
};

export { StrainForm };