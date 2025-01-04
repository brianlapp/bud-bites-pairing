import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ChallengeCardProps {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  points: number;
  progress: number;
  onJoin: () => void;
}

export const ChallengeCard = ({
  title,
  description,
  startDate,
  endDate,
  points,
  progress,
  onJoin,
}: ChallengeCardProps) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  const isActive = now >= start && now <= end;

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="text-sm text-muted-foreground">
          {start.toLocaleDateString()} - {end.toLocaleDateString()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="space-y-2">
          <Progress value={progress} />
          <div className="text-sm text-muted-foreground">
            Progress: {progress}%
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{points} points</span>
          <Button
            onClick={onJoin}
            disabled={!isActive || progress === 100}
            variant={progress === 100 ? "outline" : "default"}
          >
            {progress === 100 ? "Completed" : "Join Challenge"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};