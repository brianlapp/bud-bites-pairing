import { ThumbsDown, ThumbsUp } from "lucide-react";

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
  return (
    <div className="flex justify-between items-center mt-6 pt-4 border-t border-sage-100">
      <button
        onClick={() => onVote(pairingId, true)}
        className="flex items-center gap-2 text-sm text-sage-500 hover:text-coral-500 transition-colors"
      >
        <ThumbsUp size={16} />
        <span>{helpfulVotes} found this helpful</span>
      </button>
      <button
        onClick={() => onVote(pairingId, false)}
        className="flex items-center gap-2 text-sm text-sage-500 hover:text-coral-500 transition-colors"
      >
        <ThumbsDown size={16} />
        <span>{notHelpfulVotes}</span>
      </button>
    </div>
  );
};