import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SparklesCore } from "./SparklesCore";
import consumptionTips from "@/data/consumptionTips.json";

export const DosingCalculator = () => {
  const [weight, setWeight] = useState(() => localStorage.getItem("weight") || "");
  const [weightUnit, setWeightUnit] = useState(() => localStorage.getItem("weightUnit") || "kg");
  const [tolerance, setTolerance] = useState(() => localStorage.getItem("tolerance") || "low");
  const [method, setMethod] = useState(() => localStorage.getItem("method") || "edible");
  const [result, setResult] = useState<string | null>(null);
  const [tips, setTips] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Save to localStorage whenever values change
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

    // Adjust dose based on consumption method
    switch (method) {
      case "edible":
        baseDose *= 0.8; // Lower dose for edibles
        break;
      case "concentrate":
        baseDose *= 1.2; // Higher dose for concentrates
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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[40vh] w-full bg-sage-500/20 overflow-hidden rounded-lg mb-8"
      >
        <SparklesCore
          id="tsparticles"
          className="w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-sage-500 text-center px-4"
          >
            Your Personalized Cannabis Dosing Guide
          </motion.h1>
        </div>
      </motion.div>

      <Card className="max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-sm border-sage-200">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-2">
            <Label htmlFor="weight">Weight</Label>
            <div className="flex gap-4">
              <Input
                id="weight"
                type="number"
                placeholder="Enter your weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="flex-1"
              />
              <Select value={weightUnit} onValueChange={setWeightUnit}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lbs">lbs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tolerance">Tolerance Level</Label>
            <Select value={tolerance} onValueChange={setTolerance}>
              <SelectTrigger id="tolerance">
                <SelectValue placeholder="Select tolerance level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (Beginner)</SelectItem>
                <SelectItem value="medium">Medium (Regular)</SelectItem>
                <SelectItem value="high">High (Experienced)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="method">Consumption Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger id="method">
                <SelectValue placeholder="Select consumption method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="edible">Edible</SelectItem>
                <SelectItem value="flower">Flower</SelectItem>
                <SelectItem value="concentrate">Concentrate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={calculateDose}
              className="w-full bg-coral-500 hover:bg-coral-600 text-white"
            >
              Calculate Recommended Dose
            </Button>
          </motion.div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-sage-100 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-sage-500 mb-2">
                  Recommended Dosage:
                </h3>
                <p className="text-2xl font-bold text-sage-500">{result}</p>
                
                <div className="mt-4 space-y-2">
                  <h4 className="font-semibold text-sage-500">Safety Tips:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {tips.map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-sm text-sage-400"
                      >
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Card>
    </div>
  );
};