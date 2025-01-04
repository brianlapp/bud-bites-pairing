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
      <Card className="bg-gradient-to-br from-coral-500 to-coral-600 border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="w-6 h-6 text-white" />
            <h3 className="font-bold text-xl bg-gradient-to-r from-sage-50 to-sage-100 bg-clip-text text-transparent">
              Why {strain} Works Perfect With This Dish
            </h3>
          </div>
          <p className="text-white/90 leading-relaxed text-lg">
            {pairingData.pairingReason}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};