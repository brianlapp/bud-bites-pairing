import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserStats } from "@/pages/Profile";
import { ChartBar, Star, Award } from "lucide-react";

interface GameStatsSectionProps {
  stats: UserStats | null;
}

export const GameStatsSection = ({ stats }: GameStatsSectionProps) => {
  if (!stats) return null;

  const StatCard = ({ title, value, icon: Icon }: { title: string; value: string | number; icon: any }) => (
    <div className="flex items-center space-x-3 p-4 bg-sage-50 rounded-lg">
      <div className="bg-sage-100 p-2 rounded-full">
        <Icon className="h-5 w-5 text-sage-500" />
      </div>
      <div>
        <p className="text-sm text-sage-400">{title}</p>
        <p className="text-lg font-semibold text-sage-600">{value}</p>
      </div>
    </div>
  );

  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-sage-500">
          Game Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-sage-500 mb-3">
            Cannabis Wordle
          </h3>
          <div className="grid gap-4">
            <StatCard
              title="Games Played"
              value={stats.wordle_games_played}
              icon={ChartBar}
            />
            <StatCard
              title="Current Streak"
              value={stats.wordle_streak}
              icon={Award}
            />
            <StatCard
              title="Average Guesses"
              value={stats.wordle_avg_guesses.toFixed(1)}
              icon={Star}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-sage-500 mb-3">
            Cannabis Tycoon
          </h3>
          <div className="grid gap-4">
            <StatCard
              title="Total Sales"
              value={`$${stats.tycoon_total_sales.toLocaleString()}`}
              icon={ChartBar}
            />
            <StatCard
              title="Top Strain"
              value={stats.tycoon_top_strain || "None yet"}
              icon={Star}
            />
            <StatCard
              title="Current Level"
              value={stats.tycoon_level}
              icon={Award}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};