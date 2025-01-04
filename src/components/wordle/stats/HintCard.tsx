import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";

interface HintCardProps {
  hintUsed: boolean;
  showHint: () => void;
}

export const HintCard = ({ hintUsed, showHint }: HintCardProps) => {
  return (
    <Card className="bg-sage-100/50 dark:bg-sage-700/50 border-sage-200 dark:border-sage-600">
      <CardContent className="p-6 flex items-center justify-center">
        {!hintUsed && (
          <Button
            onClick={showHint}
            variant="outline"
            className="bg-sage-200 hover:bg-sage-300 dark:bg-sage-600 dark:hover:bg-sage-500 text-sage-500 dark:text-sage-200 min-w-[120px]"
          >
            <Sprout className="w-4 h-4 mr-2" />
            Use Hint
          </Button>
        )}
      </CardContent>
    </Card>
  );
};