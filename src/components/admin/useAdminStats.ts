import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AdminStats {
  total_users: number;
  total_recipes: number;
  total_upvotes: number;
  total_downvotes: number;
  total_wordle_players: number;
  total_wordle_games: number;
  total_tycoon_players: number;
  total_pairings_generated: number;
}

export const useAdminStats = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      try {
        // First, let's get the admin statistics
        const { data: adminStats, error: adminError } = await supabase
          .from("admin_statistics")
          .select("*")
          .single();

        if (adminError) {
          console.error("Error fetching admin stats:", adminError);
          throw adminError;
        }

        // Let's also get the actual count from strain_pairings for verification
        const { count: actualPairingsCount, error: pairingsError } = await supabase
          .from("strain_pairings")
          .select("*", { count: 'exact', head: true });

        if (pairingsError) {
          console.error("Error fetching pairings count:", pairingsError);
          throw pairingsError;
        }

        // If there's a mismatch, trigger an update
        if (adminStats && actualPairingsCount !== adminStats.total_pairings_generated) {
          console.log('Mismatch detected between actual count and admin stats');
          const { error: updateError } = await supabase.rpc('update_admin_statistics');
          if (updateError) {
            console.error("Error updating admin statistics:", updateError);
            toast({
              title: "Error",
              description: "Failed to update statistics. Please try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Statistics Updated",
              description: "Admin statistics have been refreshed.",
            });
          }
        }

        return adminStats as AdminStats;
      } catch (error) {
        console.error("Error in queryFn:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60, // 1 minute
    retry: 3,
  });
};