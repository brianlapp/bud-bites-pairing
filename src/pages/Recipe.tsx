import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StrainPairing } from "@/types/strain";
import { PairingAccordion } from "@/components/home/PairingAccordion";
import { PairingMetadata } from "@/components/home/PairingMetadata";
import { PairingVoteButtons } from "@/components/home/PairingVoteButtons";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Recipe = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: pairing, isLoading } = useQuery({
    queryKey: ['pairing', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('strain_pairings')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as StrainPairing;
    }
  });

  const handleShare = async (platform: string) => {
    if (!pairing) return;
    
    const shareText = `Check out this amazing cannabis and food pairing on BudBites!\n\n${pairing.strain_name} paired with ${JSON.parse(pairing.pairing_suggestion).dishName}`;
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

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
      toast({
        title: "Opening Share Dialog",
        description: `Sharing to ${platform}...`,
      });
    }
  };

  const cleanAndParseJSON = (jsonString: string) => {
    try {
      const cleaned = jsonString.replace(/```json\n|\n```/g, '');
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Error parsing pairing data:', error);
      return null;
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-3xl mx-auto py-16 px-4">
        <Skeleton className="h-[600px] w-full rounded-xl" />
      </div>
    );
  }

  if (!pairing) {
    return (
      <div className="container max-w-3xl mx-auto py-16 px-4 text-center">
        <p className="text-sage-400">Recipe not found</p>
      </div>
    );
  }

  const pairingData = cleanAndParseJSON(pairing.pairing_suggestion);
  
  if (!pairingData) {
    return (
      <div className="container max-w-3xl mx-auto py-16 px-4 text-center">
        <p className="text-sage-400">Error loading recipe data</p>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-16 px-4">
      <Link to="/">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Pairings
        </Button>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-white via-sage-50/50 to-sage-100/30 rounded-3xl shadow-xl overflow-hidden border border-sage-100"
      >
        <div className="relative h-48 bg-sage-100">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="p-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-sage-500 mb-4">
              {pairingData.dishName}
            </h1>
            <PairingMetadata />
          </motion.div>

          <motion.p 
            className="text-sage-400 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {pairingData.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <PairingAccordion
              pairingReason={pairingData.pairingReason}
              recipe={pairingData.recipe}
              cookingTips={pairingData.cookingTips}
            />

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Button
                onClick={() => handleShare('facebook')}
                className="bg-coral-500 hover:bg-coral-600 text-white flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Facebook className="w-5 h-5" />
                Share
              </Button>
              <Button
                onClick={() => handleShare('twitter')}
                className="bg-coral-500 hover:bg-coral-600 text-white flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Twitter className="w-5 h-5" />
                Tweet
              </Button>
              <Button
                onClick={() => handleShare('linkedin')}
                className="bg-coral-500 hover:bg-coral-600 text-white flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Linkedin className="w-5 h-5" />
                Share
              </Button>
              <Button
                onClick={() => handleShare('instagram')}
                className="bg-coral-500 hover:bg-coral-600 text-white flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Instagram className="w-5 h-5" />
                Share
              </Button>
            </div>

            <PairingVoteButtons
              pairingId={pairing.id}
              helpfulVotes={pairing.helpful_votes}
              notHelpfulVotes={pairing.not_helpful_votes}
              onVote={async () => {}} // Implement voting logic if needed
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Recipe;