import { motion } from "framer-motion";
import { Heart, Clock, Users, Leaf, BookmarkPlus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PairingData } from "@/types/pairing";

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

        <motion.div className="space-y-6">
          <motion.div 
            className="bg-sage-50/50 backdrop-blur-sm rounded-2xl p-8 border border-sage-100 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.01 }}
          >
            <header className="mb-8">
              <h3 className="font-bold text-2xl text-sage-500 tracking-tight" itemProp="name">
                Instructions
              </h3>
              <div className="mt-2 w-16 h-1 bg-coral-500 rounded-full opacity-80" />
            </header>
            
            <ol className="space-y-8" itemProp="recipeInstructions">
              {recipeSteps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex gap-6 group"
                  itemProp="step"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-500 font-medium group-hover:bg-sage-200 transition-colors">
                    {index + 1}
                  </span>
                  <div className="space-y-1 flex-1">
                    <p className="text-sage-500 leading-relaxed text-lg font-medium">
                      Step {index + 1}
                    </p>
                    <p className="text-sage-400 leading-relaxed text-base">
                      {step}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          <motion.div 
            className="bg-sage-50/50 backdrop-blur-sm rounded-2xl p-8 border border-sage-100 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.01 }}
          >
            <header className="mb-6">
              <div className="flex items-baseline gap-3">
                <h3 className="font-bold text-2xl text-sage-500 tracking-tight">Pro Tips</h3>
                <span className="text-base font-normal text-sage-400 italic">
                  (Trust me, bro! 🌿)
                </span>
              </div>
              <div className="mt-2 w-16 h-1 bg-coral-500 rounded-full opacity-80" />
            </header>
            
            <div className="prose prose-sage max-w-none">
              <p className="text-sage-400 text-lg leading-relaxed" itemProp="tips">
                {pairingData.cookingTips}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-start pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              variant="outline"
              className="group hover:bg-sage-50"
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
