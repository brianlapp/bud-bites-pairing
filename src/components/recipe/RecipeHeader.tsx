import { motion } from "framer-motion";
import { Heart, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { funnyLoadingMessages } from "./constants";

interface RecipeHeaderProps {
  dishName: string;
}

export const RecipeHeader = ({ dishName }: RecipeHeaderProps) => {
  const { toast } = useToast();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <motion.div 
        className="flex items-center gap-5"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="p-4 bg-sage-50/80 backdrop-blur-sm rounded-full shadow-inner border border-sage-100"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Heart className="w-7 h-7 text-coral-500" />
        </motion.div>
        <h2 className="text-3xl font-bold text-sage-500 tracking-tight">
          {dishName}
        </h2>
      </motion.div>
      
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="outline"
          className="flex items-center gap-3 px-6 py-6 h-auto text-lg hover:bg-sage-50 transition-all duration-300 hover:scale-105"
          onClick={() => {
            toast({
              title: "Recipe Saved! 🌿",
              description: funnyLoadingMessages[Math.floor(Math.random() * funnyLoadingMessages.length)],
            });
          }}
        >
          <BookmarkPlus className="w-5 h-5" />
          Save Recipe
        </Button>
      </motion.div>
    </div>
  );
};