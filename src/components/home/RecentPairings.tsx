import { ThumbsDown, ThumbsUp, ChefHat, Flame, Info, Cannabis, Clock, Users, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StrainPairing } from "@/types/strain";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const RecentPairings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: recentPairings = [], isLoading: isPairingsLoading } = useQuery({
    queryKey: ['recent-pairings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('strain_pairings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data as StrainPairing[];
    }
  });

  const handleVote = async (pairingId: string, isHelpful: boolean) => {
    try {
      const { error } = await supabase.rpc('increment', {
        row_id: pairingId,
        column_name: isHelpful ? 'helpful_votes' : 'not_helpful_votes'
      });

      if (error) throw error;

      toast({
        title: "Vote Recorded",
        description: "Thank you for your feedback!",
      });

      queryClient.invalidateQueries({ queryKey: ['recent-pairings'] });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to record your vote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderPairingCard = (pair: StrainPairing) => {
    try {
      const pairingData = JSON.parse(pair.pairing_suggestion);
      return (
        <Card key={pair.id} className="bg-white/80 backdrop-blur-md hover:shadow-lg transition-shadow animate-fade-up">
          <CardHeader className="border-b border-sage-100">
            <div className="flex items-center gap-2 text-sage-500 mb-2">
              <Cannabis className="w-5 h-5" />
              <span className="text-sm font-medium">Strain Pairing</span>
            </div>
            <CardTitle className="text-2xl font-bold text-sage-500 flex items-center gap-2">
              {pair.strain_name} × {pairingData.dishName}
            </CardTitle>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-sage-400">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>30 mins</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Serves 4</span>
              </div>
              <div className="flex items-center gap-1">
                <Utensils className="w-4 h-4" />
                <span>Medium</span>
              </div>
            </div>
            <CardDescription className="mt-4 text-sage-400 leading-relaxed">
              {pairingData.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="pairing-reason" className="border-sage-100">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  <div className="flex items-center gap-2 text-sage-500">
                    <Cannabis className="w-4 h-4" />
                    Why this pairing works
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sage-400 text-sm leading-relaxed">
                  {pairingData.pairingReason}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="recipe" className="border-sage-100">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  <div className="flex items-center gap-2 text-sage-500">
                    <ChefHat className="w-4 h-4" />
                    Recipe Steps
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2 text-sage-400 text-sm">
                    {pairingData.recipe.split(/\d+\./).filter(Boolean).map((step, index) => (
                      <li key={index} className="leading-relaxed pl-2">
                        {step.trim()}
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tips" className="border-sage-100">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  <div className="flex items-center gap-2 text-sage-500">
                    <Flame className="w-4 h-4" />
                    Pro Tips
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sage-400 text-sm leading-relaxed">
                  {pairingData.cookingTips}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-sage-100">
              <button
                onClick={() => handleVote(pair.id, true)}
                className="flex items-center gap-2 text-sm text-sage-500 hover:text-coral-500 transition-colors"
              >
                <ThumbsUp size={16} />
                <span>{pair.helpful_votes} found this helpful</span>
              </button>
              <button
                onClick={() => handleVote(pair.id, false)}
                className="flex items-center gap-2 text-sm text-sage-500 hover:text-coral-500 transition-colors"
              >
                <ThumbsDown size={16} />
                <span>{pair.not_helpful_votes}</span>
              </button>
            </div>
          </CardContent>
        </Card>
      );
    } catch (error) {
      return (
        <Card key={pair.id} className="bg-white/80 backdrop-blur-md hover:shadow-lg transition-shadow animate-fade-up">
          <CardHeader>
            <CardTitle className="text-xl text-sage-500">{pair.strain_name}</CardTitle>
            <CardDescription className="text-sage-400">{pair.pairing_suggestion}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-sage-200">
              <button
                onClick={() => handleVote(pair.id, true)}
                className="flex items-center gap-2 text-sm text-sage-500 hover:text-coral-500 transition-colors"
              >
                <ThumbsUp size={16} />
                <span>{pair.helpful_votes}</span>
              </button>
              <button
                onClick={() => handleVote(pair.id, false)}
                className="flex items-center gap-2 text-sm text-sage-500 hover:text-coral-500 transition-colors"
              >
                <ThumbsDown size={16} />
                <span>{pair.not_helpful_votes}</span>
              </button>
            </div>
          </CardContent>
        </Card>
      );
    }
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-bold text-sage-500 mb-8">Recent Pairings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isPairingsLoading ? (
          <div className="col-span-full text-center text-sage-400">Loading recent pairings...</div>
        ) : recentPairings.length > 0 ? (
          recentPairings.map((pair) => renderPairingCard(pair))
        ) : (
          <div className="col-span-full text-center text-sage-400">
            No pairings generated yet. Be the first to create one!
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentPairings;