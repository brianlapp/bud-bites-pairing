import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ShareButtons = () => {
  const { toast } = useToast();

  const handleShare = async (platform: string) => {
    const shareText = `Check out this amazing cannabis and food pairing on BudBites!`;
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

  return (
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
  );
};