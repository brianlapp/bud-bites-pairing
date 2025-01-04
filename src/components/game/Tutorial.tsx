import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "./GameContext";

export const Tutorial = () => {
  const { state, dispatch } = useGame();

  if (!state.tutorial) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-sage-500 mb-4">
          Welcome to Cannabis Tycoon! 🌿
        </h2>
        <div className="space-y-4 text-sage-600">
          <p>Here's how to get started:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Plant your first seed (costs $100)</li>
            <li>Water your plants regularly to keep them healthy</li>
            <li>Harvest when ready and sell for profit</li>
            <li>Earn points to unlock new strains and upgrades</li>
          </ol>
          <button
            onClick={() => dispatch({ type: "COMPLETE_TUTORIAL" })}
            className="mt-4 px-4 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors"
          >
            Got it! Let's grow 🌱
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};