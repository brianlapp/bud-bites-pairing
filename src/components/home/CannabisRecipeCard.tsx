import { motion } from "framer-motion";
import { AlertTriangle, ChefHat, Beaker, Clock } from "lucide-react";
import { CannabisRecipe } from "@/types/cannabis-recipe";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RecipeImage } from "./cannabis-recipe/RecipeImage";
import { RecipeMetadata } from "./cannabis-recipe/RecipeMetadata";
import { RecipeInstructions } from "./cannabis-recipe/RecipeInstructions";

interface CannabisRecipeCardProps {
  recipe: CannabisRecipe;
}

export const CannabisRecipeCard = ({ recipe }: CannabisRecipeCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-br from-white via-sage-50/50 to-sage-100/30 
                 rounded-3xl shadow-xl overflow-hidden mt-8 border border-sage-100 
                 transform hover:scale-[1.02] transition-all duration-300
                 dark:from-sage-900 dark:via-sage-800/50 dark:to-sage-900/30 
                 dark:border-sage-700"
    >
      <RecipeImage 
        dishName={recipe.dishName}
        description={recipe.description}
      />

      <div className="p-8 space-y-8">
        <RecipeMetadata 
          cookingTime={recipe.cookingTime}
          potencyLevel={recipe.potencyLevel}
          productType={recipe.productType}
        />

        <Alert className="bg-coral-50/50 border-coral-200 dark:bg-coral-900/20 dark:border-coral-800">
          <AlertTriangle className="h-4 w-4 text-coral-500" />
          <AlertDescription className="text-coral-700 dark:text-coral-300 text-left">
            Please consume responsibly and be aware of local laws regarding cannabis use and preparation.
          </AlertDescription>
        </Alert>

        <Card className="bg-sage-50/50 border-sage-200 dark:bg-sage-800/50 dark:border-sage-700">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-sage-600 dark:text-sage-200 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-coral-500" />
                Dosage Information
              </h3>
              <p className="text-sage-500 dark:text-sage-300 leading-relaxed text-left">
                {recipe.dosageInfo}
              </p>
            </div>

            <RecipeInstructions
              title="Cannabis Infusion Instructions"
              icon={<Beaker className="w-5 h-5 text-sage-500" />}
              instructions={recipe.infusionInstructions.split('\n')}
            />
          </CardContent>
        </Card>

        <RecipeInstructions
          title="Recipe Instructions"
          icon={<ChefHat className="w-5 h-5 text-coral-500" />}
          instructions={recipe.recipe.split(/\d+\./).filter(Boolean)}
        />

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-sage-600 dark:text-sage-200 flex items-center gap-2">
            <img 
              src="https://bf5d767a-3821-415a-bbf4-40a4485a54c8.lovableproject.com/lovable-uploads/3fa6f999-491e-425c-8394-a740a242bc58.png" 
              alt="Pro Tips" 
              className="w-5 h-5"
            />
            Pro Tips
          </h3>
          <div className="p-4 bg-white/50 rounded-lg border border-sage-100 dark:bg-sage-800/30 dark:border-sage-700">
            <p className="text-sage-500 dark:text-sage-300 text-left">{recipe.cookingTips}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};