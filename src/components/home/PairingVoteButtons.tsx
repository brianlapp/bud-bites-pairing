import { ArrowUp, ArrowDown } from "lucide-react";

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
  const voteScore = helpfulVotes - notHelpfulVotes;
  
  return (
    <div className="flex items-center gap-2 pt-4 border-t border-sage-100">
      <button
        onClick={() => onVote(pairingId, true)}
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
        onClick={() => onVote(pairingId, false)}
        className="flex flex-col items-center group"
      >
        <div className="p-1.5 rounded-full group-hover:bg-sage-100 transition-colors duration-200">
          <ArrowDown className="w-4 h-4 text-sage-500 group-hover:text-sage-600" />
        </div>
      </button>
    </div>
  );
};