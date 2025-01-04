import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import consumptionTips from "@/data/consumptionTips.json";
import { CalculatorForm } from "./CalculatorForm";
import { CalculatorResults } from "./CalculatorResults";

export const DosingCalculator = () => {
  const [weight, setWeight] = useState(() => localStorage.getItem("weight") || "");
  const [weightUnit, setWeightUnit] = useState(() => localStorage.getItem("weightUnit") || "kg");
  const [tolerance, setTolerance] = useState(() => localStorage.getItem("tolerance") || "low");
  const [method, setMethod] = useState(() => localStorage.getItem("method") || "edible");
  const [result, setResult] = useState<string | null>(null);
  const [tips, setTips] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("weight", weight);
    localStorage.setItem("weightUnit", weightUnit);
    localStorage.setItem("tolerance", tolerance);
    localStorage.setItem("method", method);
  }, [weight, weightUnit, tolerance, method]);

  const calculateDose = () => {
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0) {
      toast({
        title: "Invalid Weight",
        description: "Please enter a valid weight value.",
        variant: "destructive",
      });
      return;
    }

    let weightInKg = Number(weight);
    if (weightUnit === "lbs") {
      weightInKg = weightInKg * 0.453592;
    }

    let baseDose = weightInKg * 0.1;
    
    switch (tolerance) {
      case "medium":
        baseDose *= 2;
        break;
      case "high":
        baseDose *= 3;
        break;
      default:
        break;
    }

    switch (method) {
      case "edible":
        baseDose *= 0.8;
        break;
      case "concentrate":
        baseDose *= 1.2;
        break;
      default:
        break;
    }

    const minDose = Math.round(baseDose * 0.8);
    const maxDose = Math.round(baseDose * 1.2);

    setResult(`${minDose}-${maxDose}mg THC`);
    setTips(consumptionTips[method as keyof typeof consumptionTips].tips);
    
    toast({
      title: "Calculation Complete",
      description: "Your recommended dosage has been calculated.",
    });
  };

  return (
    <div className="relative min-h-screen">
      <div className="relative h-[40vh] w-full overflow-hidden rounded-lg mb-8">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("/placeholder.svg")',
            backgroundBlendMode: 'overlay'
          }}
        >
          {/* Coral Overlay */}
          <div className="absolute inset-0 bg-coral-500/60 backdrop-blur-sm" />
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center max-w-3xl">
            Your Personalized Cannabis Dosing Guide
          </h1>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-sm border-sage-200">
        <CalculatorForm
          weight={weight}
          weightUnit={weightUnit}
          tolerance={tolerance}
          method={method}
          onWeightChange={setWeight}
          onWeightUnitChange={setWeightUnit}
          onToleranceChange={setTolerance}
          onMethodChange={setMethod}
          onCalculate={calculateDose}
        />
        
        <AnimatePresence>
          {result && (
            <CalculatorResults
              result={result}
              tips={tips}
            />
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
};