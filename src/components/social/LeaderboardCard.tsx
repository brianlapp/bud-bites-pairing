import { Medal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LeaderboardEntry } from "@/types/social";

interface LeaderboardCardProps {
  entries: LeaderboardEntry[];
}

export const LeaderboardCard = ({ entries }: LeaderboardCardProps) => {
  const getMedalColor = (index: number) => {
    switch (index) {
      case 0: return "text-yellow-500";
      case 1: return "text-gray-400";
      case 2: return "text-amber-600";
      default: return "text-sage-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Monthly Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div key={entry.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-6">
                  <Medal className={`h-4 w-4 ${getMedalColor(index)}`} />
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.user_id}`} />
                  <AvatarFallback>{entry.user?.display_name?.[0] || '?'}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{entry.user?.display_name || 'Anonymous'}</span>
              </div>
              <span className="text-sage-500 font-semibold">{entry.score} pts</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};