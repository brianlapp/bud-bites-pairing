import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface UserStats {
  wordle_games_played: number;
  wordle_streak: number;
  wordle_avg_guesses: number;
  tycoon_total_sales: number;
  tycoon_top_strain: string | null;
  tycoon_level: number;
}

export const useUserStats = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data, error } = await supabase
          .from("user_stats")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (error) throw error;
        setStats(data);
      } catch (error: any) {
        console.error("Error fetching user stats:", error);
        toast({
          title: "Error",
          description: "Failed to load user stats",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_stats',
          filter: `user_id=eq.${supabase.auth.getSession().then(({ data }) => data.session?.user.id)}`
        },
        (payload) => {
          setStats(payload.new as UserStats);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateStats = async (updates: Partial<UserStats>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { error } = await supabase
        .from("user_stats")
        .update(updates)
        .eq("user_id", session.user.id);

      if (error) throw error;
    } catch (error: any) {
      console.error("Error updating user stats:", error);
      toast({
        title: "Error",
        description: "Failed to update stats",
        variant: "destructive",
      });
    }
  };

  return { stats, loading, updateStats };
};