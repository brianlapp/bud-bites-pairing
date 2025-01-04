import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

export const ChallengeCard = () => {
  const today = new Date();
  const formattedDate = format(today, "MMMM d, yyyy");
  const formattedTime = format(today, "h:mm a");

  return (
    <Card className="bg-sage-100/50 dark:bg-sage-700/50 border-sage-200 dark:border-sage-600">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div className="bg-sage-200 dark:bg-sage-600 rounded-full p-2">
            <Calendar className="h-6 w-6 text-sage-500 dark:text-sage-200" />
          </div>
          <div>
            <p className="text-sage-500 dark:text-sage-200 font-medium text-lg">
              Today's Challenge
            </p>
            <p className="text-sm text-sage-500 dark:text-sage-200">
              {formattedDate}
            </p>
            <p className="text-sm text-sage-500 dark:text-sage-200">
              {formattedTime}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};