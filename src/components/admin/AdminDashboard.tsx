import { Users, Book, ThumbsUp, ThumbsDown, Gamepad, Trophy, Sprout, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { StatCard } from "./StatCard";
import { useAdminStats } from "./useAdminStats";

export const AdminDashboard = () => {
  const { toast } = useToast();
  const { data: stats, isLoading, error, refetch } = useAdminStats();

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
          <StatCard
            key={i}
            title="Loading..."
            value={0}
            icon={Users}
            description="Loading..."
            color="bg-sage-100"
            iconColor="text-sage-500"
          />
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
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
};