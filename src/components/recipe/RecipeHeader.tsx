import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { funnyLoadingMessages } from "./constants";

interface RecipeHeaderProps {
  dishName: string;
}

export const RecipeHeader = ({ dishName }: RecipeHeaderProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Recipe Saved! 🌿",
      description: funnyLoadingMessages[Math.floor(Math.random() * funnyLoadingMessages.length)],
    });
  };

  return (
    <div className="flex items-center gap-5">
      <motion.button
        className="p-4 bg-sage-50/80 backdrop-blur-sm rounded-full shadow-inner border border-sage-100 hover:bg-sage-100/80 transition-colors"
        whileHover={{ scale: 1.05, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
        aria-label="Save recipe"
      >
        <Heart className="w-7 h-7 text-coral-500" />
      </motion.button>
      <h2 className="text-3xl font-bold text-sage-500 tracking-tight">
        {dishName}
      </h2>
    </div>
  );
};