import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface PairingInputProps {
  strain: string;
  isLoading: boolean;
  onStrainChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PairingInput = ({ 
  strain, 
  isLoading, 
  onStrainChange, 
  onSubmit 
}: PairingInputProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
                   hover:border-coral-500/50"
          placeholder="Enter strain for pairing (e.g., Blue Dream)"
        />
      </motion.div>
      <motion.button
        type="submit"
        disabled={isLoading || !strain}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center px-6 py-4 
                 border border-transparent text-lg font-medium rounded-lg 
                 text-white bg-coral-500 hover:bg-coral-600 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 
                 focus:ring-coral-500 transition-all duration-300 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 shadow-md hover:shadow-lg"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
        ) : (
          <>
            Generate Pairing
            <ArrowRight className="ml-2" size={20} />
          </>
        )}
      </motion.button>
    </form>
  );
};