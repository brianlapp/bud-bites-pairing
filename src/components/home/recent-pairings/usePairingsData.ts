import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StrainPairing } from "@/types/strain";
import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";

const ITEMS_PER_PAGE = 3;

export const usePairingsData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: sessionData } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: favorites = [] } = useQuery({
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

  const handleVote = useCallback(async (pairingId: string, isHelpful: boolean) => {
    if (!sessionData?.user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to vote on pairings",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.rpc('handle_pairing_vote', {
        p_pairing_id: pairingId,
        p_user_id: sessionData.user.id,
        p_is_helpful: isHelpful
      });

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['recent-pairings'] });

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
  }, [sessionData?.user?.id, toast, queryClient]);

  return {
    favorites,
    handleVote,
  };
};