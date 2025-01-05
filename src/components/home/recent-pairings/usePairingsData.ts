import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StrainPairing } from "@/types/strain";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 3;

export const usePairingsData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      if (!session?.user.id) return [];
      const { data, error } = await supabase
        .from('favorite_pairings')
        .select('pairing_id')
        .eq('user_id', session.user.id);
      
      if (error) throw error;
      return data.map(fav => fav.pairing_id);
    },
    enabled: !!session?.user.id,
  });

  const { data: pairingsData, isLoading: isPairingsLoading } = useQuery({
    queryKey: ['recent-pairings'],
    queryFn: async () => {
      const { data: pairings, error } = await supabase
        .from('strain_pairings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(ITEMS_PER_PAGE);
      
      if (error) throw error;
      return pairings as StrainPairing[];
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

  return {
    pairingsData,
    isPairingsLoading,
    favorites,
    handleVote,
  };
};