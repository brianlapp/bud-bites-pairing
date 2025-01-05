import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StrainPairing } from "@/types/strain";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 3;

export const usePairingsData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Batch related queries together
  const { data: sessionData, isLoading: isSessionLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: favorites = [], isLoading: isFavoritesLoading } = useQuery({
    queryKey: ['favorites', sessionData?.user?.id],
    queryFn: async () => {
      if (!sessionData?.user?.id) return [];
      const { data, error } = await supabase
        .from('favorite_pairings')
        .select('pairing_id')
        .eq('user_id', sessionData.user.id);
      
      if (error) throw error;
      return data.map(fav => fav.pairing_id);
    },
    enabled: !!sessionData?.user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
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
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  const handleVote = async (pairingId: string, isHelpful: boolean) => {
    try {
      // Optimistic update
      queryClient.setQueryData(['recent-pairings'], (old: StrainPairing[] | undefined) => {
        if (!old) return old;
        return old.map(pairing => {
          if (pairing.id === pairingId) {
            return {
              ...pairing,
              helpful_votes: isHelpful ? pairing.helpful_votes + 1 : pairing.helpful_votes,
              not_helpful_votes: !isHelpful ? pairing.not_helpful_votes + 1 : pairing.not_helpful_votes,
            };
          }
          return pairing;
        });
      });

      const { error } = await supabase.rpc('increment', {
        row_id: pairingId,
        column_name: isHelpful ? 'helpful_votes' : 'not_helpful_votes'
      });

      if (error) throw error;

      toast({
        title: "Vote Recorded",
        description: "Thank you for your feedback!",
      });
    } catch (error) {
      // Revert optimistic update on error
      queryClient.invalidateQueries({ queryKey: ['recent-pairings'] });
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to record your vote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isLoading = isSessionLoading || isFavoritesLoading || isPairingsLoading;

  return {
    pairingsData,
    isLoading,
    favorites,
    handleVote,
  };
};