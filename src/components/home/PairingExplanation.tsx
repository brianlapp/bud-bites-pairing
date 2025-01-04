import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { PairingData } from "@/types/pairing";

interface PairingExplanationProps {
  strain: string;
  pairingData: PairingData;
}

export const PairingExplanation = ({ strain, pairingData }: PairingExplanationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-coral-50 border-2 border-coral-100 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="w-6 h-6 text-coral-500" />
            <h3 className="font-bold text-xl text-sage-500">
              Why {strain} Works Perfect With This Dish
            </h3>
          </div>
          <p className="text-sage-400 leading-relaxed text-lg">
            {pairingData.pairingReason}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};