import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface StreakCardProps {
  streak: number;
}

export const StreakCard = ({ streak }: StreakCardProps) => {
  return (
    <Card className="bg-sage-100/50 dark:bg-sage-700/50 border-sage-200 dark:border-sage-600">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div className="bg-sage-200 dark:bg-sage-600 rounded-full p-2">
            <TrendingUp className="h-6 w-6 text-sage-500 dark:text-sage-200" />
          </div>
          <div>
            <p className="text-sage-500 dark:text-sage-200 font-medium text-lg">
              Daily Streak
            </p>
            <p className="text-2xl font-bold text-sage-500 dark:text-sage-200">
              {streak}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};