import { motion } from "framer-motion";
import { useGame, Plant as PlantType } from "./GameContext";

interface PlantProps {
  plant: PlantType;
}

export const Plant = ({ plant }: PlantProps) => {
  const { dispatch } = useGame();

  const handleWater = () => {
    dispatch({ type: "WATER_PLANT", plantId: plant.id });
  };

  const handleHarvest = () => {
    dispatch({ type: "HARVEST_PLANT", plantId: plant.id });
    dispatch({ type: "SELL_HARVEST", amount: 200 });
  };

  return (
    <motion.div
      layout
      className="bg-sage-100 p-4 rounded-lg"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <div className="text-center mb-2">
        <h3 className="font-semibold text-sage-600">{plant.strain}</h3>
        <div className="text-sm text-sage-400">
          Growth: {plant.growthStage}% | Water: {plant.waterLevel}%
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
          onClick={handleWater}
          disabled={plant.waterLevel >= 100}
        >
          💧 Water
        </motion.button>
        {plant.readyToHarvest && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 bg-green-500 text-white rounded-md text-sm"
            onClick={handleHarvest}
          >
            🌿 Harvest
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};