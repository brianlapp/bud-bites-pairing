import { motion } from "framer-motion";
import { GameProvider } from "@/components/game/GameContext";
import { GameInterface } from "@/components/game/GameInterface";
import { Tutorial } from "@/components/game/Tutorial";

export const CannabisGame = () => {
  return (
    <GameProvider>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-sage-50 p-4"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-sage-500 mb-8">Cannabis Tycoon</h1>
          <Tutorial />
          <GameInterface />
        </div>
      </motion.div>
    </GameProvider>
  );
};

export default CannabisGame;