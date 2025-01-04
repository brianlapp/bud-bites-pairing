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
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white transition-colors duration-200 group"
      >
        <div className="p-1.5 bg-sage-50 rounded-full group-hover:bg-sage-100 transition-colors duration-200">
          <ThumbsUp className="w-4 h-4 text-sage-500" />
        </div>
        <span className="text-sm font-medium text-sage-500">
          {helpfulVotes} helpful
        </span>
      </button>
      <button
        onClick={() => onVote(pairingId, false)}
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white transition-colors duration-200 group"
      >
        <div className="p-1.5 bg-sage-50 rounded-full group-hover:bg-sage-100 transition-colors duration-200">
          <ThumbsDown className="w-4 h-4 text-sage-500" />
        </div>
        <span className="text-sm font-medium text-sage-500">
          {notHelpfulVotes} not helpful
        </span>
      </button>
    </div>
  );
};