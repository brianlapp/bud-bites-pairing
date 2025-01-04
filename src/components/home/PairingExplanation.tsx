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
      <Card className="bg-gradient-to-br from-sage-200 to-sage-300 border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="flex items-center justify-center gap-2">
              <Leaf className="w-6 h-6 text-sage-500" />
              <h3 className="font-bold text-2xl tracking-tight bg-gradient-to-r from-sage-500 to-sage-400 bg-clip-text text-transparent font-serif">
                Why {strain} Works Perfect With This Dish
              </h3>
            </div>
          </div>
          <p className="text-sage-500 leading-relaxed text-lg">
            {pairingData.pairingReason}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};