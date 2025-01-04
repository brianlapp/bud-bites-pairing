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

interface WordleHeroProps {
  stats: UserStats | null;
  loading: boolean;
}

export const WordleHero = ({ stats, loading }: WordleHeroProps) => {
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
      </div>
    </div>
  );
};