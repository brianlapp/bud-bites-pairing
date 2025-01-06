import { Clock, Flame, Beaker } from "lucide-react";

interface RecipeMetadataProps {
  cookingTime: string;
  potencyLevel: string;
  productType: string;
}

export const RecipeMetadata = ({ cookingTime, potencyLevel, productType }: RecipeMetadataProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center gap-2 bg-sage-50/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-sage-100 dark:bg-sage-800/80 dark:border-sage-700">
        <Clock className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-sage-600 dark:text-sage-300">{cookingTime}</span>
      </div>
      <div className="flex items-center gap-2 bg-sage-50/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-sage-100 dark:bg-sage-800/80 dark:border-sage-700">
        <Flame className="w-4 h-4 text-coral-500" />
        <span className="text-sm font-medium text-sage-600 dark:text-sage-300">
          Potency: {potencyLevel}
        </span>
      </div>
      <div className="flex items-center gap-2 bg-sage-50/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-sage-100 dark:bg-sage-800/80 dark:border-sage-700">
        <Beaker className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium text-sage-600 dark:text-sage-300">
          {productType}
        </span>
      </div>
    </div>
  );
};