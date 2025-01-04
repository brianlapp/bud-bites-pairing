import { motion } from "framer-motion";
import { Heart, Clock, Users, Leaf, BookmarkPlus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PairingData } from "@/types/pairing";
import { PairingExplanation } from "./PairingExplanation";

interface RecipeCardProps {
  pairingData: PairingData;
}

const funnyLoadingMessages = [
  "Rolling up the perfect recipe... 🌿",
  "Grinding the ingredients... ⚗️",
  "Passing the cooking knowledge... 🔥",
  "Getting baked... the recipe, of course! 🍪",
];

export const RecipeCard = ({ pairingData }: RecipeCardProps) => {
  const { toast } = useToast();

  // Split recipe steps into an array
  const recipeSteps = pairingData.recipe
    .split(/\d+\./)
    .filter(Boolean)
    .map(step => step.trim());

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-br from-white via-sage-50/50 to-sage-100/30 rounded-3xl shadow-xl overflow-hidden mt-8 border border-sage-100 transform hover:scale-[1.02] transition-all duration-300"
      itemScope
      itemType="https://schema.org/Recipe"
    >
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
          alt={pairingData.dishName}
          className="w-full h-72 object-cover"
          itemProp="image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </motion.div>

      <div className="p-10 space-y-8">
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
              {pairingData.dishName}
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

        <motion.div 
          className="flex flex-wrap gap-6 justify-center md:justify-start"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-5 py-3 shadow-sm">
            <div className="p-2 bg-sage-50/80 backdrop-blur-sm rounded-full shadow-inner border border-sage-100">
              <Clock className="w-5 h-5 text-sage-500" />
            </div>
            <span className="text-base font-medium text-sage-500">30 mins</span>
          </div>
          
          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-5 py-3 shadow-sm">
            <div className="p-2 bg-sage-50/80 backdrop-blur-sm rounded-full shadow-inner border border-sage-100">
              <Users className="w-5 h-5 text-sage-500" />
            </div>
            <span className="text-base font-medium text-sage-500">Serves 4</span>
          </div>
          
          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-5 py-3 shadow-sm">
            <div className="p-2 bg-sage-50/80 backdrop-blur-sm rounded-full shadow-inner border border-sage-100">
              <Leaf className="w-5 h-5 text-sage-500" />
            </div>
            <span className="text-base font-medium text-sage-500">Perfect Match</span>
          </div>
        </motion.div>

        <motion.p 
          className="text-sage-400 leading-relaxed text-lg text-left"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          itemProp="description"
        >
          {pairingData.description}
        </motion.p>

        <PairingExplanation strain={pairingData.dishName} pairingData={pairingData} />

        <motion.div 
          className="space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            className="bg-sage-50/50 backdrop-blur-sm rounded-2xl p-8 border border-sage-100 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="font-bold text-xl text-sage-500 mb-6 flex items-center gap-2">
              <span itemProp="name">Instructions</span>
              <div className="flex-grow border-b-2 border-coral-500"></div>
            </h3>
            
            <ol className="space-y-6 text-left" itemProp="recipeInstructions">
              {recipeSteps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex gap-4 group"
                  itemProp="step"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center text-sage-500 font-medium group-hover:bg-sage-200 transition-colors">
                    {index + 1}
                  </span>
                  <p className="text-sage-400 leading-relaxed pt-1">{step}</p>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          <motion.div 
            className="bg-sage-50/50 backdrop-blur-sm rounded-2xl p-8 border border-sage-100 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="font-bold text-xl text-sage-500 mb-4 flex items-center gap-2">
              <span>Pro Tips</span>
              <div className="flex-grow border-b-2 border-coral-500"></div>
              <span className="text-base font-normal text-sage-400">(Trust me, bro! 🌿)</span>
            </h3>
            <p className="text-sage-400 text-lg text-left" itemProp="tips">{pairingData.cookingTips}</p>
          </motion.div>

          <motion.div
            className="flex justify-center pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              variant="outline"
              className="group"
              onClick={() => {
                toast({
                  title: "Coming Soon! 🌿",
                  description: "We'll be linking to the original recipe source in the future. Stay tuned!",
                });
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              View Original Recipe
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};