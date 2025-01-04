import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CalculatorFormProps {
  weight: string;
  weightUnit: string;
  tolerance: string;
  method: string;
  onWeightChange: (value: string) => void;
  onWeightUnitChange: (value: string) => void;
  onToleranceChange: (value: string) => void;
  onMethodChange: (value: string) => void;
  onCalculate: () => void;
}

export const CalculatorForm = ({
  weight,
  weightUnit,
  tolerance,
  method,
  onWeightChange,
  onWeightUnitChange,
  onToleranceChange,
  onMethodChange,
  onCalculate,
}: CalculatorFormProps) => {
  return (
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
            onChange={(e) => onWeightChange(e.target.value)}
            className="flex-1"
          />
          <Select value={weightUnit} onValueChange={onWeightUnitChange}>
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
        <Select value={tolerance} onValueChange={onToleranceChange}>
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
        <Select value={method} onValueChange={onMethodChange}>
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
          onClick={onCalculate}
          className="w-full bg-coral-500 hover:bg-coral-600 text-white"
        >
          Calculate Recommended Dose
        </Button>
      </motion.div>
    </motion.div>
  );
};