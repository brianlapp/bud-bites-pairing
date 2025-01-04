import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";

interface GameStatsProps {
  streak: number;
  hintUsed: boolean;
  showHint: () => void;
}

const GameStats = ({ streak, hintUsed, showHint }: GameStatsProps) => {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-sage-800 rounded-lg p-8 shadow-lg">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <p className="text-sage-500 dark:text-sage-200 font-medium">
          Daily Streak: {streak}
        </p>
        {!hintUsed && (
          <Button
            onClick={showHint}
            variant="outline"
            className="bg-sage-100 hover:bg-sage-200 dark:bg-sage-800 dark:hover:bg-sage-700 text-sage-500 dark:text-sage-200"
          >
            <Sprout className="w-4 h-4 mr-2" />
            Use Hint
          </Button>
        )}
      </div>
      
      {/* Color Code Legend */}
      <div className="border-t pt-4 mt-4">
        <h4 className="text-sage-500 dark:text-sage-200 font-medium mb-3 text-center">Color Guide</h4>
        <div className="flex justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span className="text-sage-500 dark:text-sage-200 text-sm">Correct letter & position</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-500 rounded"></div>
            <span className="text-sage-500 dark:text-sage-200 text-sm">Correct letter, wrong position</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded"></div>
            <span className="text-sage-500 dark:text-sage-200 text-sm">Letter not in word</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;