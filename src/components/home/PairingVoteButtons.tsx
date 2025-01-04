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
    <div className="flex justify-between items-center pt-4 border-t border-sage-100">
      <button
        onClick={() => onVote(pairingId, true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sage-50 transition-colors duration-200 group"
      >
        <ThumbsUp className="w-4 h-4 text-sage-500 group-hover:text-coral-500 transition-colors duration-200" />
        <span className="text-sm font-medium text-sage-500 group-hover:text-coral-500 transition-colors duration-200">
          {helpfulVotes} found this helpful
        </span>
      </button>
      <button
        onClick={() => onVote(pairingId, false)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sage-50 transition-colors duration-200 group"
      >
        <ThumbsDown className="w-4 h-4 text-sage-500 group-hover:text-coral-500 transition-colors duration-200" />
        <span className="text-sm font-medium text-sage-500 group-hover:text-coral-500 transition-colors duration-200">
          {notHelpfulVotes}
        </span>
      </button>
    </div>
  );
};