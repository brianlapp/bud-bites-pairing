import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { PairingExplanation } from "./PairingExplanation";
import { RecipeHeader } from "../recipe/RecipeHeader";
import { RecipeMetadata } from "../recipe/RecipeMetadata";
import { RecipeInstructions } from "../recipe/RecipeInstructions";
import { PairingData } from "@/types/pairing";
import { useQuery } from "@tanstack/react-query";
import { getMatchingImage } from "@/utils/imageUtils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface RecipeCardProps {
  strain: string;
  pairingData: PairingData;
}

export const RecipeCard = ({ strain, pairingData }: RecipeCardProps) => {
  const { toast } = useToast();
  const recipeSteps = pairingData.recipe
    .split(/\d+\./)
    .filter(Boolean)
    .map(step => step.trim());

  const { data: imageUrl, isLoading: isImageLoading } = useQuery({
    queryKey: ['recipe-image', pairingData.dishName],
    queryFn: () => getMatchingImage(pairingData.dishName, pairingData.description),
    staleTime: Infinity,
  });

  const handleShare = async (platform: string) => {
    const shareText = `Check out this amazing cannabis and food pairing on BudBites!\n\n${strain} paired with ${pairingData.dishName}`;
    const shareUrl = window.location.href;
    
    let shareLink = '';
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing links, so we'll copy to clipboard
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
        toast({
          title: "Link Copied!",
          description: "Share this content on Instagram by pasting the copied text",
        });
        return;
      default:
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
        toast({
          title: "Link Copied!",
          description: "Share link has been copied to your clipboard",
        });
        return;
    }

    // Open share dialog in new window for supported platforms
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
      toast({
        title: "Opening Share Dialog",
        description: `Sharing to ${platform}...`,
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-br from-white via-sage-50/50 to-sage-100/30 rounded-3xl shadow-xl overflow-hidden mt-8 border border-sage-100 transform hover:scale-[1.02] transition-all duration-300"
      itemScope
      itemType="https://schema.org/Recipe"
    >
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={pairingData.dishName}
          className="w-full h-44 object-cover"
          itemProp="image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </motion.div>

      <div className="p-10 space-y-8">
        <RecipeHeader dishName={pairingData.dishName} />
        <RecipeMetadata />

        <motion.p 
          className="text-sage-400 leading-relaxed text-lg text-left"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          itemProp="description"
        >
          {pairingData.description}
        </motion.p>

        <PairingExplanation strain={strain} pairingData={pairingData} />
        <RecipeInstructions recipeSteps={recipeSteps} cookingTips={pairingData.cookingTips} />

        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleShare('facebook')}
            className="flex items-center gap-2 hover:bg-blue-50"
          >
            <Facebook className="w-5 h-5 text-blue-600" />
            Share
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleShare('twitter')}
            className="flex items-center gap-2 hover:bg-sky-50"
          >
            <Twitter className="w-5 h-5 text-sky-500" />
            Tweet
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleShare('linkedin')}
            className="flex items-center gap-2 hover:bg-blue-50"
          >
            <Linkedin className="w-5 h-5 text-blue-700" />
            Share
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleShare('instagram')}
            className="flex items-center gap-2 hover:bg-pink-50"
          >
            <Instagram className="w-5 h-5 text-pink-600" />
            Share
          </Button>
        </div>
      </div>
    </motion.div>
  );
};