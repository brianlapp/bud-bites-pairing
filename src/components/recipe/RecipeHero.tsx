import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getMatchingImage } from "@/utils/imageUtils";

interface RecipeHeroProps {
  dishName: string;
  description: string;
}

export const RecipeHero = ({ dishName, description }: RecipeHeroProps) => {
  const { data: imageUrl, isLoading: isImageLoading } = useQuery({
    queryKey: ['recipe-image', dishName],
    queryFn: () => getMatchingImage(dishName, description),
    staleTime: Infinity,
  });

  return (
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
          alt={dishName}
          className="w-full h-44 object-cover"
          itemProp="image"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </motion.div>
  );
};