import { motion } from "framer-motion";
import { PairingData } from "@/types/pairing";
import { RecipeHeader } from "./RecipeHeader";
import { RecipeMetadata } from "./RecipeMetadata";
import { PairingExplanation } from "../home/PairingExplanation";
import { RecipeInstructions } from "./RecipeInstructions";
import { PairingVoteButtons } from "../home/PairingVoteButtons";
import { ShareButtons } from "./ShareButtons";

interface RecipeContentProps {
  strain: string;
  pairingData: PairingData;
  pairingId: string;
  helpfulVotes: number;
  notHelpfulVotes: number;
  onVote: (pairingId: string, isHelpful: boolean) => Promise<void>;
}

export const RecipeContent = ({ 
  strain, 
  pairingData, 
  pairingId,
  helpfulVotes,
  notHelpfulVotes,
  onVote 
}: RecipeContentProps) => {
  return (
    <div className="p-10 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold text-sage-500 mb-4">
          {pairingData.dishName}
        </h1>
        <RecipeMetadata />
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
        <PairingExplanation strain={strain} pairingData={pairingData} />
        <RecipeInstructions recipeSteps={pairingData.recipe.split(/\d+\./).filter(Boolean).map(step => step.trim())} cookingTips={pairingData.cookingTips} />
        
        <ShareButtons />

        <PairingVoteButtons
          pairingId={pairingId}
          helpfulVotes={helpfulVotes}
          notHelpfulVotes={notHelpfulVotes}
          onVote={onVote}
        />
      </motion.div>
    </div>
  );
};