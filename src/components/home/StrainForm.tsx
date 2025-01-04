import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
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

  return (
    <div className="max-w-2xl mx-auto">
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
                <Sparkles className="animate-spin" />
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
              className="mt-8 p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold text-sage-500 mb-2">
                Your Personalized Pairing
              </h3>
              <p className="text-sage-400">{pairing}</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { StrainForm };