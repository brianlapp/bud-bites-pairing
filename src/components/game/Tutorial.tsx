import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "./GameContext";
import { Sparkles, Seedling } from "lucide-react";

export const Tutorial = () => {
  const { state, dispatch } = useGame();

  if (!state.tutorial) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
      >
        {/* Header Section */}
        <div className="bg-sage-100 p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-sage-500" />
            <h2 className="text-2xl font-bold text-sage-500">Getting Started</h2>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <p className="text-lg text-sage-500 font-medium">Here's how to get started:</p>
            <ol className="space-y-3">
              {[
                "Plant your first seed (costs $100)",
                "Water your plants regularly to keep them healthy",
                "Harvest when ready and sell for profit",
                "Earn points to unlock new strains and upgrades"
              ].map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-sage-400"
                >
                  <Seedling className="w-5 h-5 mt-0.5 flex-shrink-0 text-sage-500" />
                  <span>{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          <motion.button
            onClick={() => dispatch({ type: "COMPLETE_TUTORIAL" })}
            className="w-full px-4 py-3 bg-coral-500 text-white rounded-md hover:bg-coral-600 transition-colors flex items-center justify-center gap-2 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Got it! Let's grow 🌱
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};