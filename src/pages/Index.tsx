import { useState } from "react";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { ArrowRight, Sparkles } from "lucide-react";
import { initializeOpenAI, generateMealPairing } from "../utils/openai";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const [strain, setStrain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pairing, setPairing] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch recent pairings
  const { data: recentPairings = [], isLoading: isPairingsLoading } = useQuery({
    queryKey: ['recent-pairings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('strain_pairings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const suggestion = await generateMealPairing(strain);
      setPairing(suggestion);

      // Store the pairing in Supabase
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
    <div className="min-h-screen flex flex-col bg-sage-50">
      <Navigation />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center space-y-8 animate-fade-up">
              <h1 className="text-4xl sm:text-6xl font-bold text-sage-500 tracking-tight">
                Elevate Your Dining Experience
              </h1>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-sage-400">
                Discover the perfect meal pairings for your favorite cannabis strains, curated by our AI sommelier.
              </p>
            </div>
          </div>
        </section>

        {/* Strain Input Section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
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

        {/* Recent Pairings Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-sage-500 mb-8">Recent Pairings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isPairingsLoading ? (
              <div className="col-span-3 text-center text-sage-400">Loading recent pairings...</div>
            ) : recentPairings.length > 0 ? (
              recentPairings.map((pair) => (
                <div
                  key={pair.id}
                  className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow animate-fade-up"
                >
                  <h3 className="font-semibold text-sage-500 mb-2">{pair.strain_name}</h3>
                  <p className="text-sage-400 text-sm">{pair.pairing_suggestion}</p>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-sage-400">No pairings generated yet. Be the first to create one!</div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;