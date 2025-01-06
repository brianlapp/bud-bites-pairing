import { motion } from "framer-motion";
import { Clock, Flame, Beaker, AlertTriangle } from "lucide-react";
import { CannabisRecipe } from "@/types/cannabis-recipe";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { getMatchingImage } from "@/utils/imageUtils";

interface CannabisRecipeCardProps {
  recipe: CannabisRecipe;
}

export const CannabisRecipeCard = ({ recipe }: CannabisRecipeCardProps) => {
  const { data: imageUrl } = useQuery({
    queryKey: ['recipe-image', recipe.dishName],
    queryFn: () => getMatchingImage(recipe.dishName, recipe.description),
    staleTime: Infinity,
  });

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
      <div className="relative">
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={recipe.dishName}
          className="w-full h-44 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-10 space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-sage-600 dark:text-sage-200">
            {recipe.dishName}
          </h2>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-sage-50 px-3 py-1.5 rounded-full dark:bg-sage-800">
              <Clock className="w-4 h-4 text-sage-500 dark:text-sage-300" />
              <span className="text-sm text-sage-600 dark:text-sage-300">{recipe.cookingTime}</span>
            </div>
            <div className="flex items-center gap-2 bg-sage-50 px-3 py-1.5 rounded-full dark:bg-sage-800">
              <Flame className="w-4 h-4 text-coral-500" />
              <span className="text-sm text-sage-600 dark:text-sage-300">
                Potency: {recipe.potencyLevel}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-sage-50 px-3 py-1.5 rounded-full dark:bg-sage-800">
              <Beaker className="w-4 h-4 text-sage-500 dark:text-sage-300" />
              <span className="text-sm text-sage-600 dark:text-sage-300">
                {recipe.productType}
              </span>
            </div>
          </div>

          <p className="text-sage-500 dark:text-sage-300">{recipe.description}</p>
        </div>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please consume responsibly and be aware of local laws regarding cannabis use and preparation.
          </AlertDescription>
        </Alert>

        <Card className="bg-sage-50/50 dark:bg-sage-800/50">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-sage-600 dark:text-sage-200">
                Dosage Information
              </h3>
              <p className="text-sage-500 dark:text-sage-300">{recipe.dosageInfo}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-sage-600 dark:text-sage-200">
                Cannabis Infusion Instructions
              </h3>
              <div className="space-y-2 text-sage-500 dark:text-sage-300">
                {recipe.infusionInstructions.split('\n').map((step, index) => (
                  <p key={index}>{step}</p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-sage-600 dark:text-sage-200">Recipe Instructions</h3>
          <ol className="list-decimal list-inside space-y-4">
            {recipe.recipe.split(/\d+\./).filter(Boolean).map((step, index) => (
              <li key={index} className="text-sage-500 dark:text-sage-300">
                {step.trim()}
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-sage-600 dark:text-sage-200">Pro Tips</h3>
          <p className="text-sage-500 dark:text-sage-300">{recipe.cookingTips}</p>
        </div>
      </div>
    </motion.div>
  );
};