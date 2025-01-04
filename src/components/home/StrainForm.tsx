import { useState } from "react";
import { ArrowRight, Heart, Leaf, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { generateMealPairing } from "@/utils/openai";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const StrainForm = () => {
  const [strain, setStrain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pairing, setPairing] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const suggestion = await generateMealPairing(strain);
      setPairing(suggestion);

      const { error } = await supabase
        .from('strain_pairings')
        .insert([
          { strain_name: strain, pairing_suggestion: suggestion }
        ]);

      if (error) throw error;

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
      setIsLoading(false);
    }
  };

  const cleanAndParseJSON = (jsonString: string) => {
    try {
      const cleaned = jsonString.replace(/```json\n|\n```/g, '');
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Error parsing pairing data:', error);
      return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Card className="bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div 
              className="space-y-2"
              whileTap={{ scale: 0.995 }}
            >
              <input
                type="text"
                id="strain"
                value={strain}
                onChange={(e) => setStrain(e.target.value)}
                className="w-full px-6 py-4 rounded-lg border-2 border-sage-200 
                         focus:ring-2 focus:ring-coral-500 focus:border-transparent 
                         transition-all duration-300 bg-white/50 backdrop-blur-sm text-lg
                         placeholder:text-sage-400 text-sage-500
                         hover:border-coral-500/50"
                placeholder="Enter your favorite strain (e.g., Blue Dream)"
              />
            </motion.div>
            <motion.button
              type="submit"
              disabled={isLoading || !strain}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center px-6 py-4 
                       border border-transparent text-lg font-medium rounded-lg 
                       text-white bg-coral-500 hover:bg-coral-600 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-coral-500 transition-all duration-300 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
              ) : (
                <>
                  Generate Pairing
                  <ArrowRight className="ml-2" size={20} />
                </>
              )}
            </motion.button>
          </form>

          {pairing && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              {(() => {
                const pairingData = cleanAndParseJSON(pairing);
                if (!pairingData) return null;

                return (
                  <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-sage-50 rounded-full">
                        <Heart className="w-6 h-6 text-coral-500" />
                      </div>
                      <h2 className="text-2xl font-bold text-sage-500">
                        {pairingData.dishName}
                      </h2>
                    </div>

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
                          <Leaf className="w-4 h-4 text-sage-500" />
                        </div>
                        <span className="text-sm font-medium text-sage-400">Perfect Match</span>
                      </div>
                    </div>

                    <p className="text-sage-400 leading-relaxed">
                      {pairingData.description}
                    </p>

                    <div className="space-y-4">
                      <div className="bg-sage-50 rounded-lg p-4">
                        <h3 className="font-semibold text-sage-500 mb-2">Why This Pairing Works</h3>
                        <p className="text-sage-400">{pairingData.pairingReason}</p>
                      </div>

                      <div className="bg-sage-50 rounded-lg p-4">
                        <h3 className="font-semibold text-sage-500 mb-2">Recipe</h3>
                        <p className="text-sage-400 whitespace-pre-line">{pairingData.recipe}</p>
                      </div>

                      <div className="bg-sage-50 rounded-lg p-4">
                        <h3 className="font-semibold text-sage-500 mb-2">Pro Tips</h3>
                        <p className="text-sage-400">{pairingData.cookingTips}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { StrainForm };