import { motion } from "framer-motion";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { BudgetPlanner } from "@/components/budget/BudgetPlanner";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { CircleIcon } from "lucide-react";

const Budget = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-sage-50"
    >
      <Navigation />
      <div className="relative min-h-screen">
        <AuroraBackground className="mb-0">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center max-w-3xl relative z-10">
              Your Cannabis Budget Planner
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-center max-w-2xl">
              Track your cannabis expenses, visualize spending patterns, and get personalized savings recommendations
            </p>
          </div>
        </AuroraBackground>

        <div className="relative pb-32">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-sage-500 mb-12">How to Use the Budget Planner</h2>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="p-6 rounded-lg bg-white shadow-sm border border-sage-200 relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center text-white font-semibold">
                    <CircleIcon className="w-6 h-6 stroke-[3]" />
                    <span className="absolute text-white">1</span>
                  </div>
                  <h3 className="font-medium text-sage-500 mb-2">Enter Your Income</h3>
                  <p className="text-sage-400 text-sm">Start by entering your monthly income to establish your budget baseline.</p>
                </div>
                <div className="p-6 rounded-lg bg-white shadow-sm border border-sage-200 relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center text-white font-semibold">
                    <CircleIcon className="w-6 h-6 stroke-[3]" />
                    <span className="absolute text-white">2</span>
                  </div>
                  <h3 className="font-medium text-sage-500 mb-2">Track Expenses</h3>
                  <p className="text-sage-400 text-sm">Input your cannabis-related expenses across different categories.</p>
                </div>
                <div className="p-6 rounded-lg bg-white shadow-sm border border-sage-200 relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center text-white font-semibold">
                    <CircleIcon className="w-6 h-6 stroke-[3]" />
                    <span className="absolute text-white">3</span>
                  </div>
                  <h3 className="font-medium text-sage-500 mb-2">Review Insights</h3>
                  <p className="text-sage-400 text-sm">Analyze your spending patterns and get personalized savings tips.</p>
                </div>
              </div>
            </div>

            <BudgetPlanner />
          </div>

          {/* Wave SVG positioned at the bottom */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden transform rotate-180">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="relative block w-full h-[60px] text-[#4d3232] fill-current"
            >
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
            </svg>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Budget;