import { useState } from "react";
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

export const DosingCalculator = () => {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [tolerance, setTolerance] = useState("low");
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

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

    let baseDose = weightInKg * 0.1; // 0.1mg per kg for low tolerance
    
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

    const minDose = Math.round(baseDose * 0.8);
    const maxDose = Math.round(baseDose * 1.2);

    setResult(`${minDose}-${maxDose}mg THC`);
    
    toast({
      title: "Calculation Complete",
      description: "Your recommended dosage has been calculated.",
    });
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-sm border-sage-200">
      <div className="space-y-6">
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

        <Button
          onClick={calculateDose}
          className="w-full bg-coral-500 hover:bg-coral-600 text-white"
        >
          Calculate Recommended Dose
        </Button>

        {result && (
          <div className="mt-6 p-4 bg-sage-100 rounded-lg">
            <h3 className="text-lg font-semibold text-sage-500 mb-2">
              Recommended Dosage:
            </h3>
            <p className="text-2xl font-bold text-sage-500">{result}</p>
            <p className="mt-2 text-sm text-sage-400">
              Note: This is a general recommendation. Start low and go slow. Consult with a healthcare professional for personalized advice.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};