import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { PairingExplanation } from "../home/PairingExplanation";
import { RecipeHeader } from "./RecipeHeader";
import { RecipeMetadata } from "./RecipeMetadata";
import { RecipeInstructions } from "./RecipeInstructions";
import { PairingData } from "@/types/pairing";
import { useQuery } from "@tanstack/react-query";
import { getMatchingImage } from "@/utils/imageUtils";
import { useToast } from "@/hooks/use-toast";
import { funnyLoadingMessages } from "./constants";

interface RecipeCardProps {
  strain: string;
  pairingData: PairingData;
}

export const RecipeCard = ({ strain, pairingData }: RecipeCardProps) => {
  const { toast } = useToast();
  const recipeSteps = pairingData.recipe
    .split(/\d+\./)
    .filter(Boolean)
    .map(step => step.trim());

  const { data: imageUrl, isLoading: isImageLoading } = useQuery({
    queryKey: ['recipe-image', pairingData.dishName],
    queryFn: () => getMatchingImage(pairingData.dishName, pairingData.description),
    staleTime: Infinity,
  });

  const handleSave = () => {
    toast({
      title: "Recipe Saved! 🌿",
      description: funnyLoadingMessages[Math.floor(Math.random() * funnyLoadingMessages.length)],
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-br from-white via-sage-50/50 to-sage-100/30 rounded-3xl shadow-xl overflow-hidden mt-8 border-2 border-coral-500 transform hover:scale-[1.02] transition-all duration-300"
      itemScope
      itemType="https://schema.org/Recipe"
    >
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {isImageLoading ? (
          <div className="w-full h-44 bg-sage-100 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-sage-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={imageUrl || '/placeholder.svg'}
            alt={pairingData.dishName}
            className="w-full h-44 object-cover"
            itemProp="image"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </motion.div>

      <div className="p-10 space-y-8">
        <div className="flex items-center justify-between">
          <RecipeHeader dishName={pairingData.dishName} />
          <motion.button
            className="p-3 bg-white rounded-full shadow-lg border border-sage-100 hover:bg-sage-50 transition-colors group z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            aria-label="Save recipe"
          >
            <Heart className="w-6 h-6 text-coral-500 group-hover:scale-110 transition-transform" />
          </motion.button>
        </div>
        
        <RecipeMetadata />

        <motion.p 
          className="text-sage-400 leading-relaxed text-lg text-left"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          itemProp="description"
        >
          {pairingData.description}
        </motion.p>

        <PairingExplanation strain={strain} pairingData={pairingData} />
        <RecipeInstructions recipeSteps={recipeSteps} cookingTips={pairingData.cookingTips} />
      </div>
    </motion.div>
  );
};