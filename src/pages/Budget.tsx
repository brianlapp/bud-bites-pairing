import { motion } from "framer-motion";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { BudgetPlanner } from "@/components/budget/BudgetPlanner";

const Budget = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-sage-50"
    >
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sage-500 mb-8 text-center">
          Monthly Budget Planner
        </h1>
        <BudgetPlanner />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Budget;