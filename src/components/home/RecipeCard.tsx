import { motion } from "framer-motion";
import { Heart, Clock, Users, Leaf, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PairingData } from "@/types/pairing";

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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-br from-white via-sage-50/50 to-sage-100/30 rounded-3xl shadow-xl overflow-hidden mt-8 border border-sage-100 transform hover:scale-[1.02] transition-all duration-300"
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
          className="text-sage-400 leading-relaxed text-lg text-center md:text-left"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {pairingData.description}
        </motion.p>

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
            <h3 className="font-bold text-xl text-sage-500 mb-4">The Recipe, Dude! 🔥</h3>
            <p className="text-sage-400 whitespace-pre-line text-lg">{pairingData.recipe}</p>
          </motion.div>

          <motion.div 
            className="bg-sage-50/50 backdrop-blur-sm rounded-2xl p-8 border border-sage-100 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="font-bold text-xl text-sage-500 mb-4">Pro Tips (Trust me, bro!) 🌿</h3>
            <p className="text-sage-400 text-lg">{pairingData.cookingTips}</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};