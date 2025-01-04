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
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="pairing-reason" className="border-sage-100">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-sage-50 rounded-lg">
              <Cannabis className="w-4 h-4 text-sage-500" />
            </div>
            <span className="text-sm font-medium text-sage-500">Why this pairing works</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-sage-400 text-sm leading-relaxed pt-4">
          {pairingReason}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="recipe" className="border-sage-100">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-sage-50 rounded-lg">
              <ChefHat className="w-4 h-4 text-sage-500" />
            </div>
            <span className="text-sm font-medium text-sage-500">Recipe Steps</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <ol className="list-decimal list-inside space-y-3 text-sage-400 text-sm">
            {recipe.split(/\d+\./).filter(Boolean).map((step, index) => (
              <li key={index} className="leading-relaxed">
                <span className="ml-2">{step.trim()}</span>
              </li>
            ))}
          </ol>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="tips" className="border-sage-100">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-sage-50 rounded-lg">
              <Flame className="w-4 h-4 text-sage-500" />
            </div>
            <span className="text-sm font-medium text-sage-500">Pro Tips</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-sage-400 text-sm leading-relaxed pt-4">
          {cookingTips}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};