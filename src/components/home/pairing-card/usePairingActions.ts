import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cleanAndParseJSON } from "./utils";

export const usePairingActions = (pairingId: string, initialFavorited: boolean = false) => {
  const [isLiked, setIsLiked] = useState(initialFavorited);
  const { toast } = useToast();

  const handleFavorite = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to favorite pairings",
          variant: "destructive",
        });
        return;
      }

      if (isLiked) {
        const { error } = await supabase
          .from('favorite_pairings')
          .delete()
          .eq('user_id', session.user.id)
          .eq('pairing_id', pairingId);

        if (error) throw error;
        
        toast({
          title: "Removed from favorites",
          description: "Pairing has been removed from your favorites",
        });
      } else {
        const { error } = await supabase
          .from('favorite_pairings')
          .upsert({
            user_id: session.user.id,
            pairing_id: pairingId,
          }, {
            onConflict: 'user_id,pairing_id'
          });

        if (error) throw error;
        
        toast({
          title: "Added to favorites",
          description: "Pairing has been added to your favorites",
        });
      }

      setIsLiked(!isLiked);
    } catch (error: any) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (pairingData: any, strainName: string) => {
    if (!pairingData) return;

    const shareText = `Check out this amazing cannabis and food pairing on BudBites!\n\n${strainName} paired with ${pairingData.dishName}`;
    const shareUrl = `${window.location.origin}/recipe/${pairingId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'BudBites Pairing',
          text: shareText,
          url: shareUrl,
        });
        toast({
          title: "Shared successfully",
          description: "Thanks for sharing this pairing!",
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
          toast({
            title: "Error",
            description: "Failed to share. Please try again.",
            variant: "destructive",
          });
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
        toast({
          title: "Link copied",
          description: "Share link has been copied to your clipboard",
        });
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        toast({
          title: "Error",
          description: "Failed to copy link. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return {
    isLiked,
    handleFavorite,
    handleShare,
  };
};