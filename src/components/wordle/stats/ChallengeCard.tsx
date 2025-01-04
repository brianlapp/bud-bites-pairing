import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

export const ChallengeCard = () => {
  const today = new Date();
  const formattedDate = format(today, "MMMM d, yyyy");
  const formattedTime = format(today, "h:mm a");

  return (
    <Card className="bg-coral-500/10 dark:bg-coral-500/5 border-coral-500/20 dark:border-coral-500/10">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div className="bg-coral-500/20 dark:bg-coral-500/10 rounded-full p-2">
            <Calendar className="h-6 w-6 text-coral-500 dark:text-coral-500/90" />
          </div>
          <div>
            <p className="text-coral-600 dark:text-coral-500 font-medium text-lg">
              Today's Challenge
            </p>
            <p className="text-sm text-coral-600/80 dark:text-coral-500/80">
              {formattedDate}
            </p>
            <p className="text-sm text-coral-600/80 dark:text-coral-500/80">
              {formattedTime}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};