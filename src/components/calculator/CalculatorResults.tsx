import { motion } from "framer-motion";

interface CalculatorResultsProps {
  result: string | null;
  tips: string[];
}

export const CalculatorResults = ({ result, tips }: CalculatorResultsProps) => {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-6 p-4 bg-sage-100 rounded-lg"
    >
      <h3 className="text-lg font-semibold text-sage-500 mb-2">
        Recommended Dosage:
      </h3>
      <p className="text-2xl font-bold text-sage-500">{result}</p>
      
      <div className="mt-4 space-y-2">
        <h4 className="font-semibold text-sage-500">Safety Tips:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {tips.map((tip, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-sm text-sage-400"
            >
              {tip}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};