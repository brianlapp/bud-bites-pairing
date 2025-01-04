import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserStats } from "@/types/profile";
import { Trophy, Star, Award, ChartBar, Gamepad2 } from "lucide-react";

interface GameStatsSectionProps {
  stats: UserStats | null;
}

export const GameStatsSection = ({ stats }: GameStatsSectionProps) => {
  if (!stats) return null;

  const StatCard = ({ title, value, icon: Icon }: { title: string; value: string | number; icon: any }) => (
    <div className="flex items-center space-x-3 p-4 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors">
      <div className="bg-sage-100 p-2 rounded-full">
        <Icon className="h-6 w-6 text-sage-500" />
      </div>
      <div>
        <p className="text-sm text-sage-400">{title}</p>
        <p className="text-xl font-semibold text-sage-600">{value}</p>
      </div>
    </div>
  );

  return (
    <Card className="bg-white shadow-lg border-sage-200">
      <CardHeader className="border-b border-sage-100">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-sage-500" />
          <CardTitle className="text-2xl font-bold text-sage-500">
            Gaming Achievements
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Gamepad2 className="h-5 w-5 text-sage-500" />
            <h3 className="text-xl font-semibold text-sage-500">
              Cannabis Wordle
            </h3>
          </div>
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
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-sage-500" />
            <h3 className="text-xl font-semibold text-sage-500">
              Cannabis Tycoon
            </h3>
          </div>
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