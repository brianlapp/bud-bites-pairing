import { motion } from "framer-motion";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const CannabisWordle = () => {
  return (
    <div className="min-h-screen bg-sage-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-sage-500 mb-4">Cannabis Wordle</h1>
            <p className="text-sage-400">Guess the cannabis-related word in 6 tries!</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-center text-sage-500">Coming soon! Check back for our cannabis-themed word guessing game.</p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default CannabisWordle;