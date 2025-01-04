import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Check, ThumbsUp, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { PairingData } from "@/types/pairing";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PairingExplanationProps {
  strain: string;
  pairingData: PairingData;
}

const InfoCard = ({ icon: Icon, title, description }: { 
  icon: typeof Info;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-sage-100">
    <div className="p-3 bg-sage-50 rounded-full mb-4">
      <Icon className="w-5 h-5 text-sage-500" />
    </div>
    <h4 className="font-medium text-sage-500 mb-2">{title}</h4>
    <p className="text-sage-400 text-sm text-center leading-relaxed">
      {description}
    </p>
  </div>
);

export const PairingExplanation = ({ strain, pairingData }: PairingExplanationProps) => {
  const { toast } = useToast();
  
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

  const aspects = [
    {
      icon: Info,
      title: "Flavor Profile",
      description: "The terpenes in this strain complement the dish's primary flavors, creating a harmonious taste experience."
    },
    {
      icon: Check,
      title: "Perfect Match",
      description: "The strain's effects enhance the dining experience without overpowering the subtle nuances of the dish."
    },
    {
      icon: ThumbsUp,
      title: "Enhanced Experience",
      description: "This combination creates a balanced and elevated dining experience that highlights both cannabis and cuisine."
    }
  ];

  return (
    <Card className="p-8 bg-white border border-sage-100">
      <CardContent className="p-0 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-sage-500 via-coral-500 to-sage-500 bg-clip-text text-transparent">
              Why {strain} Works With This Dish
            </h3>
            <p className="text-sage-400 max-w-2xl mx-auto">
              {pairingData.pairingReason}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aspects.map((aspect, index) => (
              <motion.div
                key={aspect.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 } 
                }}
              >
                <InfoCard {...aspect} />
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
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
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
};