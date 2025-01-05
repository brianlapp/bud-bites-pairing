import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getMatchingImage, IMAGE_SIZES } from "@/utils/imageUtils";

interface RecipeHeroProps {
  dishName: string;
  description: string;
}

export const RecipeHero = ({ dishName, description }: RecipeHeroProps) => {
  const { data: imageUrl, isLoading: isImageLoading } = useQuery({
    queryKey: ['recipe-image', dishName],
    queryFn: async () => {
      const [smallUrl, mediumUrl, largeUrl] = await Promise.all([
        getMatchingImage(dishName, description, 'small'),
        getMatchingImage(dishName, description, 'medium'),
        getMatchingImage(dishName, description, 'large'),
      ]);
      return { smallUrl, mediumUrl, largeUrl };
    },
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
        <motion.picture>
          <source
            media={`(min-width: ${IMAGE_SIZES.large}px)`}
            srcSet={imageUrl?.largeUrl}
          />
          <source
            media={`(min-width: ${IMAGE_SIZES.medium}px)`}
            srcSet={imageUrl?.mediumUrl}
          />
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={imageUrl?.smallUrl || '/placeholder.svg'}
            alt={dishName}
            className="w-full h-44 object-cover"
            loading="lazy"
            itemProp="image"
          />
        </motion.picture>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </motion.div>
  );
};