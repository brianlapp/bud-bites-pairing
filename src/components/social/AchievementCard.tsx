import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AchievementCardProps {
  name: string;
  description: string;
  icon: string;
  points: number;
  unlocked?: boolean;
}

export const AchievementCard = ({ name, description, icon, points, unlocked = false }: AchievementCardProps) => {
  return (
    <Card className={`${unlocked ? 'bg-sage-50' : 'bg-gray-50'}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {name}
        </CardTitle>
        <Award
          className={`h-4 w-4 ${unlocked ? 'text-sage-500' : 'text-gray-400'}`}
        />
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{description}</div>
        <div className="mt-2 font-semibold text-xs">
          {points} points
        </div>
      </CardContent>
    </Card>
  );
};