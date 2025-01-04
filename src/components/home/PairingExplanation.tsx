import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Check, ThumbsUp } from "lucide-react";
import { PairingData } from "@/types/pairing";

interface PairingExplanationProps {
  strain: string;
  pairingData: PairingData;
}

const InfoCard = ({ icon: Icon, title, description }: { 
  icon: typeof Info;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-sage-100">
    <div className="p-3 bg-sage-50 rounded-full mb-4">
      <Icon className="w-5 h-5 text-sage-500" />
    </div>
    <h4 className="font-medium text-sage-500 mb-2">{title}</h4>
    <p className="text-sage-400 text-sm text-center leading-relaxed">
      {description}
    </p>
  </div>
);

export const PairingExplanation = ({ strain, pairingData }: PairingExplanationProps) => {
  // Split the pairing reason into three aspects for the cards
  const aspects = [
    {
      icon: Info,
      title: "Flavor Profile",
      description: "The terpenes in this strain complement the dish's primary flavors, creating a harmonious taste experience."
    },
    {
      icon: Check,
      title: "Perfect Match",
      description: "The strain's effects enhance the dining experience without overpowering the subtle nuances of the dish."
    },
    {
      icon: ThumbsUp,
      title: "Enhanced Experience",
      description: "This combination creates a balanced and elevated dining experience that highlights both cannabis and cuisine."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="font-serif text-2xl font-bold tracking-tight text-sage-500 mb-2">
          Why {strain} Works With This Dish
        </h3>
        <p className="text-sage-400 max-w-2xl mx-auto">
          {pairingData.pairingReason}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aspects.map((aspect, index) => (
          <motion.div
            key={aspect.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.1 } 
            }}
          >
            <InfoCard {...aspect} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};