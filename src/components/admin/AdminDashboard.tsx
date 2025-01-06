import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Book, ThumbsUp, ThumbsDown, Gamepad, Trophy, Sprout, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
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

export const AdminDashboard = () => {
  const { toast } = useToast();
  const { data: stats, isLoading, error, refetch } = useQuery({
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

        console.log('Actual pairings count:', actualPairingsCount);
        console.log('Admin stats:', adminStats);

        // If there's a mismatch, let's trigger an update of admin statistics
        if (adminStats && actualPairingsCount !== adminStats.total_pairings_generated) {
          console.log('Mismatch detected between actual count and admin stats');
          const { error: updateError } = await supabase.rpc('update_admin_statistics');
          if (updateError) {
            console.error("Error updating admin statistics:", updateError);
          } else {
            // Refetch the stats after updating
            return await refetch();
          }
        }

        return adminStats as AdminStats;
      } catch (error) {
        console.error("Error in queryFn:", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    // Subscribe to changes in the admin_statistics table
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_statistics'
        },
        async () => {
          await refetch();
          toast({
            title: "Statistics Updated",
            description: "The admin dashboard has been refreshed with new data.",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch, toast]);

  if (error) {
    console.error("Render error:", error);
    return (
      <div className="p-8">
        <div className="text-red-500">Error loading admin statistics. Please try again later.</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(8).fill(0).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-4 w-1/2 bg-sage-100 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats?.total_users || 0,
      icon: Users,
      description: "Active user accounts",
      color: "bg-[#F1F0FB]",
      iconColor: "text-[#9b87f5]",
    },
    {
      title: "Total Recipes",
      value: stats?.total_recipes || 0,
      icon: Book,
      description: "Created recipes",
      color: "bg-[#F2FCE2]",
      iconColor: "text-sage-500",
    },
    {
      title: "Total Upvotes",
      value: stats?.total_upvotes || 0,
      icon: ThumbsUp,
      description: "Helpful votes",
      color: "bg-[#D3E4FD]",
      iconColor: "text-blue-500",
    },
    {
      title: "Total Downvotes",
      value: stats?.total_downvotes || 0,
      icon: ThumbsDown,
      description: "Not helpful votes",
      color: "bg-[#FFE4E4]",
      iconColor: "text-red-400",
    },
    {
      title: "Wordle Players",
      value: stats?.total_wordle_players || 0,
      icon: Gamepad,
      description: "Active players",
      color: "bg-[#F1F0FB]",
      iconColor: "text-[#9b87f5]",
    },
    {
      title: "Wordle Games",
      value: stats?.total_wordle_games || 0,
      icon: Trophy,
      description: "Games played",
      color: "bg-[#FFF3E0]",
      iconColor: "text-orange-400",
    },
    {
      title: "Tycoon Players",
      value: stats?.total_tycoon_players || 0,
      icon: Sprout,
      description: "Active players",
      color: "bg-[#F2FCE2]",
      iconColor: "text-sage-500",
    },
    {
      title: "Generated Pairings",
      value: stats?.total_pairings_generated || 0,
      icon: Sparkles,
      description: "AI-generated pairings",
      color: "bg-[#D3E4FD]",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-bold tracking-tight text-[#1a1a1a] mb-2">Admin Dashboard</h2>
        <p className="text-[#8E9196]">Monitor and analyze your platform's key metrics</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card 
            key={stat.title}
            className={`${stat.color} border-none shadow-sm hover:shadow-md transition-shadow duration-200`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#1a1a1a]">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1a1a1a] mb-1">
                {stat.value.toLocaleString()}
              </div>
              <p className="text-xs text-[#8E9196]">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};