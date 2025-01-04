import { StreakCard } from "./stats/StreakCard";
import { ChallengeCard } from "./stats/ChallengeCard";
import { HintCard } from "./stats/HintCard";
import { ColorGuide } from "./stats/ColorGuide";

interface GameStatsProps {
  streak: number;
  hintUsed: boolean;
  showHint: () => void;
}

const GameStats = ({ streak, hintUsed, showHint }: GameStatsProps) => {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-sage-800 rounded-lg p-8 shadow-lg">
      {/* Stats and Hint Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StreakCard streak={streak} />
        <ChallengeCard />
        <HintCard hintUsed={hintUsed} showHint={showHint} />
      </div>
      <ColorGuide />
    </div>
  );
};

export default GameStats;