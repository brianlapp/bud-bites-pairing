import { motion } from "framer-motion";
import { Clock, Flame, Beaker, AlertTriangle, ChefHat } from "lucide-react";
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
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
          <h2 className="text-3xl font-bold text-white mb-2">
            {recipe.dishName}
          </h2>
          <p className="text-white/90 line-clamp-2">
            {recipe.description}
          </p>
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-sage-50/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-sage-100 dark:bg-sage-800/80 dark:border-sage-700">
            <Clock className="w-4 h-4 text-sage-500 dark:text-sage-300" />
            <span className="text-sm font-medium text-sage-600 dark:text-sage-300">{recipe.cookingTime}</span>
          </div>
          <div className="flex items-center gap-2 bg-sage-50/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-sage-100 dark:bg-sage-800/80 dark:border-sage-700">
            <Flame className="w-4 h-4 text-coral-500" />
            <span className="text-sm font-medium text-sage-600 dark:text-sage-300">
              Potency: {recipe.potencyLevel}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-sage-50/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-sage-100 dark:bg-sage-800/80 dark:border-sage-700">
            <Beaker className="w-4 h-4 text-sage-500 dark:text-sage-300" />
            <span className="text-sm font-medium text-sage-600 dark:text-sage-300">
              {recipe.productType}
            </span>
          </div>
        </div>

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
                <ChefHat className="w-5 h-5" />
                Dosage Information
              </h3>
              <p className="text-sage-500 dark:text-sage-300 leading-relaxed text-left">
                {recipe.dosageInfo}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-sage-600 dark:text-sage-200 flex items-center gap-2">
                <Beaker className="w-5 h-5" />
                Cannabis Infusion Instructions
              </h3>
              <div className="space-y-3">
                {recipe.infusionInstructions.split('\n').map((step, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-sage-100 
                             dark:bg-sage-800/30 dark:border-sage-700"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 text-sm font-medium dark:bg-sage-700 dark:text-sage-300">
                      {index + 1}
                    </span>
                    <p className="text-sage-500 dark:text-sage-300 text-left">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-sage-600 dark:text-sage-200 flex items-center gap-2">
            <ChefHat className="w-5 h-5" />
            Recipe Instructions
          </h3>
          <ol className="space-y-4">
            {recipe.recipe.split(/\d+\./).filter(Boolean).map((step, index) => (
              <li 
                key={index}
                className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-sage-100 
                         dark:bg-sage-800/30 dark:border-sage-700"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 text-sm font-medium dark:bg-sage-700 dark:text-sage-300">
                  {index + 1}
                </span>
                <p className="text-sage-500 dark:text-sage-300 text-left">{step.trim()}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-sage-600 dark:text-sage-200 flex items-center gap-2">
            <Flame className="w-5 h-5" />
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