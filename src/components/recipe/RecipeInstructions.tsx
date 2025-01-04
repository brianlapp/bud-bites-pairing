import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface RecipeInstructionsProps {
  recipeSteps: string[];
  cookingTips: string;
}

export const RecipeInstructions = ({ recipeSteps, cookingTips }: RecipeInstructionsProps) => {
  const { toast } = useToast();

  return (
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
        <p className="text-sage-400 text-lg text-left" itemProp="tips">{cookingTips}</p>
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
  );
};