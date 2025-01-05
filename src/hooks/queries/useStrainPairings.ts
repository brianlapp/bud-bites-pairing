import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { StrainPairing } from "@/types/strain";

export const STRAIN_PAIRINGS_QUERY_KEY = ["strain-pairings"] as const;

export function useStrainPairings() {
  return useQuery({
    queryKey: STRAIN_PAIRINGS_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("strain_pairings")
        .select("*")
        .order("created_at", { ascending: false })
        .returns<StrainPairing[]>();

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60, // Data stays fresh for 1 minute
    gcTime: 1000 * 60 * 5, // Cache is kept for 5 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: 'always',
    retry: 3,
  });
}

export function usePrefetchStrainPairings() {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.prefetchQuery({
      queryKey: STRAIN_PAIRINGS_QUERY_KEY,
      queryFn: async () => {
        const { data, error } = await supabase
          .from("strain_pairings")
          .select("*")
          .order("created_at", { ascending: false })
          .returns<StrainPairing[]>();

        if (error) throw error;
        return data;
      },
      staleTime: 1000 * 60,
    });
  };
}