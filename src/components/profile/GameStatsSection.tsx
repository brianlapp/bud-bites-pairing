/**
 * GameStatsSection Component
 * 
 * Displays user gaming statistics in a card layout, organized by game type.
 * Shows stats for Cannabis Wordle and Cannabis Tycoon games.
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserStats } from "@/types/profile";
import { Trophy, Star, Award, ChartBar, Gamepad2 } from "lucide-react";
import { GameStatsGroupProps, GameStatsSectionProps } from "./types/stats";
import { GameStatsGroup } from "./components/GameStatsGroup";

export const GameStatsSection = ({ stats }: GameStatsSectionProps) => {
  if (!stats) return null;

  const gameGroups: GameStatsGroupProps[] = [
    {
      title: "Cannabis Wordle",
      icon: Gamepad2,
      stats: [
        {
          title: "Games Played",
          value: stats.wordle_games_played,
          icon: ChartBar,
        },
        {
          title: "Current Streak",
          value: stats.wordle_streak,
          icon: Award,
        },
        {
          title: "Average Guesses",
          value: stats.wordle_avg_guesses.toFixed(1),
          icon: Star,
        },
      ],
    },
    {
      title: "Cannabis Tycoon",
      icon: Trophy,
      stats: [
        {
          title: "Total Sales",
          value: `$${stats.tycoon_total_sales.toLocaleString()}`,
          icon: ChartBar,
        },
        {
          title: "Top Strain",
          value: stats.tycoon_top_strain || "None yet",
          icon: Star,
        },
        {
          title: "Current Level",
          value: stats.tycoon_level,
          icon: Award,
        },
      ],
    },
  ];

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
        {gameGroups.map((group) => (
          <GameStatsGroup key={group.title} {...group} />
        ))}
      </CardContent>
    </Card>
  );
};