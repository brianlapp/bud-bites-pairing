import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { generateMealPairing } from "@/utils/openai";
import { supabase } from "@/integrations/supabase/client";

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
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-up">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="strain" className="block text-sm font-medium text-sage-500">
              Enter your cannabis strain
            </label>
            <input
              type="text"
              id="strain"
              value={strain}
              onChange={(e) => setStrain(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
              placeholder="e.g., Blue Dream"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !strain}
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-coral-500 hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Sparkles className="animate-spin" />
            ) : (
              <>
                Generate Pairing
                <ArrowRight className="ml-2" size={20} />
              </>
            )}
          </button>
        </form>

        {pairing && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-sage-500 mb-2">Your Personalized Pairing</h3>
            <p className="text-sage-400">{pairing}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default StrainForm;