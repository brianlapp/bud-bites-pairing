import { motion } from "framer-motion";

interface RecipeHeaderProps {
  dishName: string;
}

export const RecipeHeader = ({ dishName }: RecipeHeaderProps) => {
  return (
    <motion.h2 
      className="text-3xl font-bold text-sage-500 tracking-tight"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {dishName}
    </motion.h2>
  );
};