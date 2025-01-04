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
        <AccordionTrigger className="text-sm font-medium hover:no-underline">
          <div className="flex items-center gap-2 text-sage-500">
            <Cannabis className="w-4 h-4" />
            Why this pairing works
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-sage-400 text-sm leading-relaxed">
          {pairingReason}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="recipe" className="border-sage-100">
        <AccordionTrigger className="text-sm font-medium hover:no-underline">
          <div className="flex items-center gap-2 text-sage-500">
            <ChefHat className="w-4 h-4" />
            Recipe Steps
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ol className="list-decimal list-inside space-y-2 text-sage-400 text-sm">
            {recipe.split(/\d+\./).filter(Boolean).map((step, index) => (
              <li key={index} className="leading-relaxed pl-2">
                {step.trim()}
              </li>
            ))}
          </ol>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="tips" className="border-sage-100">
        <AccordionTrigger className="text-sm font-medium hover:no-underline">
          <div className="flex items-center gap-2 text-sage-500">
            <Flame className="w-4 h-4" />
            Pro Tips
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-sage-400 text-sm leading-relaxed">
          {cookingTips}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};