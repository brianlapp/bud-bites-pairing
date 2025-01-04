import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ChallengeCardProps {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  points: number;
  progress?: number;
  onJoin?: () => void;
}

export const ChallengeCard = ({
  title,
  description,
  startDate,
  endDate,
  points,
  progress = 0,
  onJoin
}: ChallengeCardProps) => {
  const isActive = new Date() >= startDate && new Date() <= endDate;
  const progressPercent = Math.min(100, Math.max(0, progress));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Trophy className={`h-4 w-4 ${isActive ? 'text-sage-500' : 'text-gray-400'}`} />
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-4">{description}</p>
        <div className="space-y-2">
          <Progress value={progressPercent} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progressPercent}% Complete</span>
            <span>{points} points</span>
          </div>
        </div>
        {isActive && onJoin && (
          <Button
            onClick={onJoin}
            variant="outline"
            size="sm"
            className="w-full mt-4"
          >
            Join Challenge
          </Button>
        )}
      </CardContent>
    </Card>
  );
};