import { ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PairingVoteButtonsProps {
  pairingId: string;
  helpfulVotes: number;
  notHelpfulVotes: number;
  onVote: (pairingId: string, isHelpful: boolean) => Promise<void>;
}

export const PairingVoteButtons = ({
  pairingId,
  helpfulVotes,
  notHelpfulVotes,
  onVote,
}: PairingVoteButtonsProps) => {
  const { toast } = useToast();
  const voteScore = helpfulVotes - notHelpfulVotes;
  
  const handleVote = async (isHelpful: boolean) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to vote on pairings",
        variant: "destructive",
      });
      return;
    }

    try {
      await onVote(pairingId, isHelpful);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('duplicate key value')) {
          toast({
            title: "Already Voted",
            description: "You have already voted on this pairing",
            variant: "destructive",
          });
        } else {
          console.error('Vote error:', error);
          toast({
            title: "Error",
            description: "Failed to record your vote. Please try again.",
            variant: "destructive",
          });
        }
      }
    }
  };
  
  return (
    <div className="flex items-center gap-2 pt-4 border-t border-sage-100">
      <button
        onClick={() => handleVote(true)}
        className="flex flex-col items-center group"
      >
        <div className="p-1.5 rounded-full group-hover:bg-sage-100 transition-colors duration-200">
          <ArrowUp className="w-4 h-4 text-sage-500 group-hover:text-sage-600" />
        </div>
      </button>

      <span className="text-sm font-medium text-sage-600 min-w-[2rem] text-center">
        {voteScore}
      </span>

      <button
        onClick={() => handleVote(false)}
        className="flex flex-col items-center group"
      >
        <div className="p-1.5 rounded-full group-hover:bg-sage-100 transition-colors duration-200">
          <ArrowDown className="w-4 h-4 text-sage-500 group-hover:text-sage-600" />
        </div>
      </button>
    </div>
  );
};