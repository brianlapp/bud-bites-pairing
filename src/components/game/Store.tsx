import { motion } from "framer-motion";
import { useGame } from "./GameContext";

export const Store = () => {
  const { state } = useGame();

  const upgrades = [
    {
      name: "Better Lights",
      cost: 500,
      description: "Increases growth speed by 20%",
      locked: state.points < 50,
    },
    {
      name: "Auto-Watering",
      cost: 1000,
      description: "Automatically waters your plants",
      locked: state.points < 100,
    },
    {
      name: "New Strain: Blue Dream",
      cost: 2000,
      description: "Unlock a new premium strain",
      locked: state.points < 200,
    },
  ];

  return (
    <div className="space-y-4">
      {upgrades.map((upgrade) => (
        <motion.div
          key={upgrade.name}
          whileHover={{ scale: 1.02 }}
          className={`p-4 rounded-lg border ${
            upgrade.locked
              ? "bg-gray-100 border-gray-200"
              : "bg-white border-sage-200 cursor-pointer"
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-sage-600">{upgrade.name}</h3>
              <p className="text-sm text-sage-400">{upgrade.description}</p>
            </div>
            <div className="text-sage-500">${upgrade.cost}</div>
          </div>
          {upgrade.locked && (
            <div className="text-xs text-red-500 mt-2">
              Requires {upgrade.name === "New Strain: Blue Dream" ? "200" : "50"}{" "}
              points
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};