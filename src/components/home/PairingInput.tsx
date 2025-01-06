import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import consumptionTips from "@/data/consumptionTips.json";

interface PairingInputProps {
  strain: string;
  isLoading: boolean;
  onStrainChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  mode: 'pair' | 'cook';
  onModeChange: (mode: 'pair' | 'cook') => void;
  productType: string;
  desiredDish: string;
  potencyLevel: string;
  onProductTypeChange: (value: string) => void;
  onDesiredDishChange: (value: string) => void;
  onPotencyLevelChange: (value: string) => void;
}

export const PairingInput = ({ 
  strain, 
  isLoading, 
  onStrainChange,
  onSubmit,
  mode,
  onModeChange,
  productType,
  desiredDish,
  potencyLevel,
  onProductTypeChange,
  onDesiredDishChange,
  onPotencyLevelChange
}: PairingInputProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Tabs value={mode} onValueChange={(value) => onModeChange(value as 'pair' | 'cook')} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pair">Pair with Food</TabsTrigger>
          <TabsTrigger value="cook">Cook with Cannabis</TabsTrigger>
        </TabsList>

        <TabsContent value="pair" className="space-y-4">
          <motion.div className="space-y-2" whileTap={{ scale: 0.995 }}>
            <input
              type="text"
              id="strain"
              value={strain}
              onChange={(e) => onStrainChange(e.target.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-sage-200 
                       focus:ring-2 focus:ring-coral-500 focus:border-transparent 
                       transition-all duration-300 bg-white/50 backdrop-blur-sm text-lg
                       placeholder:text-sage-400 text-sage-500
                       hover:border-coral-500/50
                       dark:bg-sage-900/50 dark:border-sage-700 dark:text-sage-200
                       dark:placeholder:text-sage-500"
              placeholder="Enter strain for pairing (e.g., Blue Dream)"
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="cook" className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="productType">Cannabis Product Type</Label>
              <Select value={productType} onValueChange={onProductTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flower">Flower</SelectItem>
                  <SelectItem value="concentrate">Concentrate</SelectItem>
                  <SelectItem value="distillate">Distillate</SelectItem>
                </SelectContent>
              </Select>
              {productType && consumptionTips[productType as keyof typeof consumptionTips]?.tips[0] && (
                <p className="text-sm text-sage-500 dark:text-sage-400">
                  {consumptionTips[productType as keyof typeof consumptionTips].tips[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredDish">Desired Dish</Label>
              <Select value={desiredDish} onValueChange={onDesiredDishChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select desired dish" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brownies">Brownies</SelectItem>
                  <SelectItem value="cookies">Cookies</SelectItem>
                  <SelectItem value="gummies">Gummies</SelectItem>
                  <SelectItem value="honey">Infused Honey</SelectItem>
                  <SelectItem value="butter">Cannabis Butter</SelectItem>
                  <SelectItem value="oil">Cannabis Oil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="potencyLevel">Desired Potency</Label>
              <Select value={potencyLevel} onValueChange={onPotencyLevelChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select potency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <motion.button
        type="submit"
        disabled={isLoading || (mode === 'pair' ? !strain : (!productType || !desiredDish || !potencyLevel))}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center px-6 py-4 
                 border border-transparent text-lg font-medium rounded-lg 
                 text-white bg-coral-500 hover:bg-coral-600 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 
                 focus:ring-coral-500 transition-all duration-300 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 shadow-md hover:shadow-lg
                 dark:bg-coral-600 dark:hover:bg-coral-700"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
        ) : (
          <>
            {mode === 'pair' ? 'Generate Pairing' : 'Generate Recipe'}
            <ArrowRight className="ml-2" size={20} />
          </>
        )}
      </motion.button>
    </form>
  );
};