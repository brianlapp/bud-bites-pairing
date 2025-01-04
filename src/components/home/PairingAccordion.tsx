import { ChefHat, Flame, Cannabis } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PairingAccordionProps {
  pairingReason: string;
  recipe: string;
  cookingTips: string;
}

export const PairingAccordion = ({
  pairingReason,
  recipe,
  cookingTips,
}: PairingAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      <AccordionItem value="pairing-reason" className="border-sage-100 rounded-xl bg-white">
        <AccordionTrigger className="hover:no-underline px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sage-50 rounded-full">
              <Cannabis className="w-4 h-4 text-sage-500" />
            </div>
            <span className="text-sm font-medium text-sage-500">Why this pairing works</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-sage-400 text-base leading-relaxed px-4 pb-4">
          {pairingReason}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="recipe" className="border-sage-100 rounded-xl bg-white">
        <AccordionTrigger className="hover:no-underline px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sage-50 rounded-full">
              <ChefHat className="w-4 h-4 text-sage-500" />
            </div>
            <span className="text-sm font-medium text-sage-500">Recipe Steps</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <ol className="list-decimal list-inside space-y-2 text-sage-400 text-base">
            {recipe.split(/\d+\./).filter(Boolean).map((step, index) => (
              <li key={index} className="leading-relaxed">
                <span className="ml-2">{step.trim()}</span>
              </li>
            ))}
          </ol>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="tips" className="border-sage-100 rounded-xl bg-white">
        <AccordionTrigger className="hover:no-underline px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sage-50 rounded-full">
              <Flame className="w-4 h-4 text-sage-500" />
            </div>
            <span className="text-sm font-medium text-sage-500">Pro Tips</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-sage-400 text-base leading-relaxed px-4 pb-4">
          {cookingTips}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};