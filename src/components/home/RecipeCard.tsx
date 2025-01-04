import { motion } from "framer-motion";
import { Heart, Clock, Users, Leaf, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PairingData } from "@/types/pairing";

interface RecipeCardProps {
  pairingData: PairingData;
}

export const RecipeCard = ({ pairingData }: RecipeCardProps) => {
  const { toast } = useToast();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden mt-6"
    >
      <img
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
        alt={pairingData.dishName}
        className="w-full h-64 object-cover"
      />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-sage-50 rounded-full">
              <Heart className="w-6 h-6 text-coral-500" />
            </div>
            <h2 className="text-2xl font-bold text-sage-500">
              {pairingData.dishName}
            </h2>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              toast({
                title: "Recipe Saved!",
                description: "This recipe has been saved to your collection.",
              });
            }}
          >
            <BookmarkPlus className="w-4 h-4" />
            Save Recipe
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sage-50 rounded-full">
              <Clock className="w-4 h-4 text-sage-500" />
            </div>
            <span className="text-sm font-medium text-sage-400">30 mins</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sage-50 rounded-full">
              <Users className="w-4 h-4 text-sage-500" />
            </div>
            <span className="text-sm font-medium text-sage-400">Serves 4</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sage-50 rounded-full">
              <Leaf className="w-4 h-4 text-sage-500" />
            </div>
            <span className="text-sm font-medium text-sage-400">Perfect Match</span>
          </div>
        </div>

        <p className="text-sage-400 leading-relaxed">
          {pairingData.description}
        </p>

        <div className="space-y-4">
          <div className="bg-sage-50 rounded-lg p-4">
            <h3 className="font-semibold text-sage-500 mb-2">Recipe</h3>
            <p className="text-sage-400 whitespace-pre-line">{pairingData.recipe}</p>
          </div>

          <div className="bg-sage-50 rounded-lg p-4">
            <h3 className="font-semibold text-sage-500 mb-2">Pro Tips</h3>
            <p className="text-sage-400">{pairingData.cookingTips}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};