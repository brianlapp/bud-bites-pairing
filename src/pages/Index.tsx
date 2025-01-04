import { useState, useEffect } from "react";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { ArrowRight, Sparkles } from "lucide-react";
import { initializeOpenAI, generateMealPairing } from "../utils/openai";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [strain, setStrain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pairing, setPairing] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const suggestion = await generateMealPairing(strain);
      setPairing(suggestion);
      toast({
        title: "Pairing Generated!",
        description: "Your meal pairing has been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate pairing. Please check your API key.",
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
            {/* Placeholder cards - will be populated with real data */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="font-semibold text-sage-500 mb-2">Blue Dream</h3>
                <p className="text-sage-400 text-sm">
                  Pairs perfectly with grilled salmon and roasted vegetables, complementing the strain's sweet berry notes.
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;