import { motion } from "framer-motion";
import { useGame } from "./GameContext";
import { GrowRoom } from "./GrowRoom";
import { Store } from "./Store";
import { Sprout, Store as StoreIcon } from "lucide-react";

export const GameInterface = () => {
  const { state } = useGame();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Sprout className="w-8 h-8 text-sage-500" />
            <h2 className="text-2xl font-bold text-sage-500">Grow Room</h2>
          </div>
          <div className="text-sage-500">
            💰 ${state.money} | 🌟 {state.points} points
          </div>
        </div>
        <GrowRoom />
      </motion.div>

      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <StoreIcon className="w-8 h-8 text-sage-500" />
          <h2 className="text-2xl font-bold text-sage-500">Store</h2>
        </div>
        <Store />
      </motion.div>
    </div>
  );
};