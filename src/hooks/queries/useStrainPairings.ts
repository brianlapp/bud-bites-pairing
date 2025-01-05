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
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Cache is kept for 30 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always',
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
      staleTime: 1000 * 60 * 5,
    });
  };
}