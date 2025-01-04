import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StrainPairing } from "@/types/strain";
import { PairingCard } from "./PairingCard";
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <section className="w-full py-16 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-sage-500 mb-12">Recent Pairings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {isPairingsLoading ? (
            <>
              <Skeleton className="h-[600px] w-full rounded-xl" />
              <Skeleton className="h-[600px] w-full rounded-xl" />
              <Skeleton className="h-[600px] w-full rounded-xl" />
            </>
          ) : recentPairings.length > 0 ? (
            recentPairings.map((pair) => (
              <PairingCard key={pair.id} pair={pair} onVote={handleVote} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-sage-400">
              No pairings generated yet. Be the first to create one!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentPairings;