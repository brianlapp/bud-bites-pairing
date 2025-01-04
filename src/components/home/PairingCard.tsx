import { Cannabis, ArrowRight, Heart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { StrainPairing } from "@/types/strain";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PairingVoteButtons } from "./PairingVoteButtons";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PairingCardProps {
  pair: StrainPairing;
  onVote: (pairingId: string, isHelpful: boolean) => Promise<void>;
  isFavorited?: boolean;
}

const getStrainType = (strainName: string): 'sativa' | 'indica' | 'hybrid' => {
  const lowerName = strainName.toLowerCase();
  if (lowerName.includes('sativa')) return 'sativa';
  if (lowerName.includes('indica')) return 'indica';
  return 'hybrid';
};

const getStrainColor = (type: 'sativa' | 'indica' | 'hybrid'): string => {
  switch (type) {
    case 'sativa':
      return 'text-coral-500';
    case 'indica':
      return 'text-indigo-500';
    case 'hybrid':
      return 'text-sage-500';
    default:
      return 'text-sage-500';
  }
};

export const PairingCard = ({ pair, onVote, isFavorited = false }: PairingCardProps) => {
  const [isLiked, setIsLiked] = useState(isFavorited);
  const { toast } = useToast();

  const cleanAndParseJSON = (jsonString: string) => {
    try {
      const cleaned = jsonString.replace(/```json\n|\n```/g, '');
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Error parsing pairing data:', error);
      return null;
    }
  };

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
          .eq('pairing_id', pair.id);

        if (error) throw error;
        
        toast({
          title: "Removed from favorites",
          description: "Pairing has been removed from your favorites",
        });
      } else {
        const { error } = await supabase
          .from('favorite_pairings')
          .insert({
            user_id: session.user.id,
            pairing_id: pair.id,
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

  const handleShare = async () => {
    const pairingData = cleanAndParseJSON(pair.pairing_suggestion);
    if (!pairingData) return;

    const shareText = `Check out this amazing cannabis and food pairing on BudBites!\n\n${pair.strain_name} paired with ${pairingData.dishName}`;
    const shareUrl = `${window.location.origin}/recipe/${pair.id}`;

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
      // Fallback to copying to clipboard
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
  
  const pairingData = cleanAndParseJSON(pair.pairing_suggestion);
  const strainType = getStrainType(pair.strain_name);
  const iconColor = getStrainColor(strainType);
  
  if (!pairingData) {
    return (
      <Card className="w-full bg-white shadow-lg rounded-xl p-6">
        <p className="text-sage-400">Error loading pairing data</p>
      </Card>
    );
  }
  
  return (
    <Card className="w-full bg-white border-sage-100 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardHeader className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sage-50 rounded-full">
              <Cannabis className={`w-5 h-5 ${iconColor}`} />
            </div>
            <h3 className="text-lg font-semibold text-sage-500">
              {pair.strain_name}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="text-sage-400 hover:text-sage-500"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavorite}
              className={`${isLiked ? 'text-red-500' : 'text-sage-400'} hover:text-red-500`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-2xl font-bold text-sage-500">
            {pairingData.dishName}
          </h4>
          
          <p className="text-sage-400 text-base leading-relaxed line-clamp-2">
            {pairingData.description}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-0 space-y-6">
        <Link to={`/recipe/${pair.id}`}>
          <Button className="w-full group" variant="outline">
            View Full Recipe
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        
        <PairingVoteButtons
          pairingId={pair.id}
          helpfulVotes={pair.helpful_votes}
          notHelpfulVotes={pair.not_helpful_votes}
          onVote={onVote}
        />
      </CardContent>
    </Card>
  );
};