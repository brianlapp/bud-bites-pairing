import { motion } from "framer-motion";
import { ArrowRight, ChefHat, Leaf } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 bg-sage-100 rounded-full dark:bg-sage-800">
          <button
            onClick={() => onModeChange('pair')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              mode === 'pair'
                ? 'bg-white text-sage-600 shadow-md dark:bg-sage-700 dark:text-sage-200'
                : 'text-sage-500 hover:text-sage-600 dark:text-sage-400 dark:hover:text-sage-300'
            }`}
          >
            <Leaf className="w-4 h-4" />
            Pair with Food
          </button>
          <button
            onClick={() => onModeChange('cook')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              mode === 'cook'
                ? 'bg-white text-sage-600 shadow-md dark:bg-sage-700 dark:text-sage-200'
                : 'text-sage-500 hover:text-sage-600 dark:text-sage-400 dark:hover:text-sage-300'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            Cook with Cannabis
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className={`mx-auto bg-white/80 backdrop-blur-sm border-2 border-sage-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-sage-900/80 dark:border-sage-700 ${mode === 'cook' ? 'w-[60%]' : 'w-full'}`}>
          {mode === 'pair' ? (
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
          ) : (
            <div className="grid gap-8">
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Label htmlFor="productType" className="text-lg font-medium text-sage-600 dark:text-sage-300">
                  Cannabis Product Type
                </Label>
                <Select value={productType} onValueChange={onProductTypeChange}>
                  <SelectTrigger className="w-full px-4 py-6 text-lg bg-white/50 dark:bg-sage-900/50 border-2 border-sage-200 dark:border-sage-700 hover:border-coral-500/50 transition-colors">
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flower">Flower</SelectItem>
                    <SelectItem value="concentrate">Concentrate</SelectItem>
                    <SelectItem value="distillate">Distillate</SelectItem>
                  </SelectContent>
                </Select>
                {productType && consumptionTips[productType as keyof typeof consumptionTips]?.tips[0] && (
                  <motion.p 
                    className="text-sm text-sage-500 dark:text-sage-400 mt-2 italic bg-sage-50 dark:bg-sage-800/50 p-3 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    💡 Tip: {consumptionTips[productType as keyof typeof consumptionTips].tips[0]}
                  </motion.p>
                )}
              </motion.div>

              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Label htmlFor="desiredDish" className="text-lg font-medium text-sage-600 dark:text-sage-300">
                  Desired Dish
                </Label>
                <Select value={desiredDish} onValueChange={onDesiredDishChange}>
                  <SelectTrigger className="w-full px-4 py-6 text-lg bg-white/50 dark:bg-sage-900/50 border-2 border-sage-200 dark:border-sage-700 hover:border-coral-500/50 transition-colors">
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
              </motion.div>

              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Label htmlFor="potencyLevel" className="text-lg font-medium text-sage-600 dark:text-sage-300">
                  Desired Potency
                </Label>
                <Select value={potencyLevel} onValueChange={onPotencyLevelChange}>
                  <SelectTrigger className="w-full px-4 py-6 text-lg bg-white/50 dark:bg-sage-900/50 border-2 border-sage-200 dark:border-sage-700 hover:border-coral-500/50 transition-colors">
                    <SelectValue placeholder="Select potency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>
          )}
        </div>

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
    </div>
  );
};