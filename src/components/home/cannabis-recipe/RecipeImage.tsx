import { useQuery } from "@tanstack/react-query";
import { getMatchingImage } from "@/utils/imageUtils";

interface RecipeImageProps {
  dishName: string;
  description: string;
}

export const RecipeImage = ({ dishName, description }: RecipeImageProps) => {
  const { data: imageUrl } = useQuery({
    queryKey: ['recipe-image', dishName],
    queryFn: () => getMatchingImage(dishName, description),
    staleTime: Infinity,
  });

  return (
    <div className="relative">
      <img
        src={imageUrl || '/placeholder.svg'}
        alt={dishName}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
        <h2 className="text-3xl font-bold text-white mb-2">
          {dishName}
        </h2>
        <p className="text-white/90 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};