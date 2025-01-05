import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StrainPairing } from "@/types/strain";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 3;

export const usePairingsData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
    if (!sessionData?.user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to vote on pairings",
        variant: "destructive",
      });
      return;
    }

    try {
      // Call the handle_pairing_vote function
      const { error } = await supabase.rpc('handle_pairing_vote', {
        p_pairing_id: pairingId,
        p_user_id: sessionData.user.id,
        p_is_helpful: isHelpful
      });

      if (error) throw error;

      // Invalidate the query to refresh the data
      queryClient.invalidateQueries({ queryKey: ['recent-pairings'] });

      toast({
        title: "Vote Recorded",
        description: "Thank you for your feedback!",
      });
    } catch (error) {
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