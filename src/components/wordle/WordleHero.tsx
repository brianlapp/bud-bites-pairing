import { motion } from "framer-motion";
import { WordleStats } from "./WordleStats";
import { ColorGuide } from "./stats/ColorGuide";
import { UserStats } from "@/types/profile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AchievementCard } from "../social/AchievementCard";
import { ChallengeCard } from "../social/ChallengeCard";
import { LeaderboardCard } from "../social/LeaderboardCard";
import { useSocialFeatures } from "@/hooks/useSocialFeatures";
import { useUser } from "@supabase/auth-helpers-react";

interface WordleHeroProps {
  stats: UserStats | null;
  loading: boolean;
}

export const WordleHero = ({ stats, loading }: WordleHeroProps) => {
  const user = useUser();
  const { achievements, userAchievements, challenges, userChallenges, leaderboardEntries, joinChallenge } = useSocialFeatures(user?.id);

  // Filter Wordle-specific achievements and challenges
  const wordleAchievements = achievements.filter(a => a.name.toLowerCase().includes('wordle'));
  const wordleChallenges = challenges.filter(c => c.title.toLowerCase().includes('wordle'));

  return (
    <div className="relative bg-gradient-to-b from-sage-500 to-sage-400 text-white pt-24 pb-32">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-sage-100"
        >
          Cannabis Wordle Challenge
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <Accordion type="single" collapsible>
            <AccordionItem value="instructions" className="border-white/20">
              <AccordionTrigger className="text-white hover:no-underline">
                <span className="text-xl font-semibold">How to Play</span>
              </AccordionTrigger>
              <AccordionContent className="text-white/90">
                <ul className="space-y-2">
                  <li>• Guess the 5-letter cannabis-related word</li>
                  <li>• Each guess must be a valid word</li>
                  <li>• Colors will show how close your guess was</li>
                  <li>• You have 6 attempts to guess the word</li>
                  <li>• Use your keyboard or click the letters below</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
        
        <div className="max-w-4xl mx-auto mb-8">
          <WordleStats stats={stats} loading={loading} />
        </div>

        {user && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Achievements</h2>
              {wordleAchievements.map((achievement) => {
                const userAchievement = userAchievements.find(
                  ua => ua.achievement_id === achievement.id
                );
                return (
                  <AchievementCard
                    key={achievement.id}
                    name={achievement.name}
                    description={achievement.description}
                    icon={achievement.icon}
                    points={achievement.points}
                    unlocked={!!userAchievement}
                  />
                );
              })}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Active Challenges</h2>
              {wordleChallenges.map((challenge) => {
                const userChallenge = userChallenges.find(
                  uc => uc.challenge_id === challenge.id
                );
                const progress = userChallenge?.completed_at ? 100 : 0;
                return (
                  <ChallengeCard
                    key={challenge.id}
                    title={challenge.title}
                    description={challenge.description}
                    startDate={challenge.start_date}
                    endDate={challenge.end_date}
                    points={challenge.points}
                    progress={progress}
                    onJoin={() => joinChallenge.mutate(challenge.id)}
                  />
                );
              })}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Monthly Leaderboard</h2>
              <LeaderboardCard entries={leaderboardEntries} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};