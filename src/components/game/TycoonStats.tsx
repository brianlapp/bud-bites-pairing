import { motion } from "framer-motion";
import { TrendingUp, Award, Sprout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { UserStats } from "@/hooks/useUserStats";

interface TycoonStatsProps {
  stats: UserStats | null;
  loading?: boolean;
}

export const TycoonStats = ({ stats, loading }: TycoonStatsProps) => {
  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-24 bg-sage-100 rounded-lg" />
        <div className="h-24 bg-sage-100 rounded-lg" />
        <div className="h-24 bg-sage-100 rounded-lg" />
      </div>
    );
  }

  const statItems = [
    {
      label: "Total Sales",
      value: `$${stats?.tycoon_total_sales?.toLocaleString() || "0"}`,
      icon: TrendingUp,
    },
    {
      label: "Top Strain",
      value: stats?.tycoon_top_strain || "None yet",
      icon: Sprout,
    },
    {
      label: "Current Level",
      value: stats?.tycoon_level || 1,
      icon: Award,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-white dark:bg-sage-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-sage-100 dark:bg-sage-700 p-3 rounded-full">
                  <item.icon className="w-6 h-6 text-sage-500 dark:text-sage-300" />
                </div>
                <div>
                  <p className="text-sm text-sage-500 dark:text-sage-300">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold text-sage-700 dark:text-sage-100">
                    {item.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};