import { motion } from "framer-motion";
import { Clock, Users, Leaf } from "lucide-react";

export const RecipeMetadata = () => {
  return (
    <motion.div 
      className="flex flex-wrap gap-6 justify-center md:justify-start"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-5 py-3 shadow-sm">
        <div className="p-2 bg-sage-50/80 backdrop-blur-sm rounded-full shadow-inner border border-sage-100">
          <Clock className="w-5 h-5 text-sage-500" />
        </div>
        <span className="text-base font-medium text-sage-500">30 mins</span>
      </div>
      
      <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-5 py-3 shadow-sm">
        <div className="p-2 bg-sage-50/80 backdrop-blur-sm rounded-full shadow-inner border border-sage-100">
          <Users className="w-5 h-5 text-sage-500" />
        </div>
        <span className="text-base font-medium text-sage-500">Serves 4</span>
      </div>
      
      <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-5 py-3 shadow-sm">
        <div className="p-2 bg-sage-50/80 backdrop-blur-sm rounded-full shadow-inner border border-sage-100">
          <Leaf className="w-5 h-5 text-sage-500" />
        </div>
        <span className="text-base font-medium text-sage-500">Perfect Match</span>
      </div>
    </motion.div>
  );
};