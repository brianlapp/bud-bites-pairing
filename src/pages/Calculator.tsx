import { motion } from "framer-motion";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { DosingCalculator } from "@/components/calculator/DosingCalculator";

const Calculator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-sage-50"
    >
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-sage-500 to-sage-400 text-white pt-24 pb-32">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Cannabis Dosing Calculator
          </h1>
          <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-8 text-sage-100">
            Get personalized dosing recommendations based on your weight, tolerance level, and preferred consumption method.
          </p>
        </div>

        {/* Bottom wave SVG */}
        <div className="absolute -bottom-[1px] left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px]"
            style={{ transform: 'rotate(180deg)' }}
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-coral-500"
            />
          </svg>
        </div>
      </div>

      {/* Info Section with Soft Coral Background */}
      <div className="relative bg-coral-500/20 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          {/* Quick Guide Steps */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-sage-500">1. Enter Your Details</h3>
              <p className="text-sage-400">Input your weight and select your preferred unit of measurement (kg/lbs).</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-sage-500">2. Set Preferences</h3>
              <p className="text-sage-400">Choose your tolerance level and preferred consumption method.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-sage-500">3. Get Results</h3>
              <p className="text-sage-400">Receive a personalized dosing recommendation with safety tips.</p>
            </div>
          </div>
        </div>

        {/* Bottom wave SVG */}
        <div className="absolute -bottom-[1px] left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px]"
            style={{ transform: 'rotate(180deg)' }}
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-sage-50"
            />
          </svg>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <DosingCalculator />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Calculator;