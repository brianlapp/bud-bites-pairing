import { motion } from "framer-motion";
import { useGame } from "./GameContext";
import { Plant } from "./Plant";

export const GrowRoom = () => {
  const { state, dispatch } = useGame();

  const handlePlantSeed = (strain: string) => {
    dispatch({ type: "PLANT_SEED", strain });
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {state.plants.map((plant) => (
          <Plant key={plant.id} plant={plant} />
        ))}
        {state.plants.length < 6 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-40 border-2 border-dashed border-sage-300 rounded-lg flex items-center justify-center text-sage-400 hover:text-sage-500 hover:border-sage-400 transition-colors"
            onClick={() => handlePlantSeed(state.unlockedStrains[0])}
          >
            + New Plant ($100)
          </motion.button>
        )}
      </div>
    </div>
  );
};