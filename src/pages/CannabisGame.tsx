import { motion } from "framer-motion";
import { GameProvider } from "@/components/game/GameContext";
import { GameInterface } from "@/components/game/GameInterface";
import { Tutorial } from "@/components/game/Tutorial";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const CannabisGame = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-sage-50">
        <Navigation />
        
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-sage-500 to-sage-400 text-white pt-24 pb-32">
          <div className="container mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-sage-100"
            >
              Welcome to Cannabis Tycoon!
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-8 text-sage-100 font-medium tracking-wide"
            >
              Build your cannabis empire! Grow premium strains, manage your operations, and become the ultimate Cannabis Tycoon.
            </motion.p>
            
            {/* Quick Guide Steps */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">1. Plant & Grow</h3>
                <p className="text-sage-100">Start with premium strains and master the art of cultivation.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">2. Manage & Harvest</h3>
                <p className="text-sage-100">Water your plants and harvest them at the perfect time.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">3. Sell & Expand</h3>
                <p className="text-sage-100">Sell your harvest and reinvest in your growing empire.</p>
              </motion.div>
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

        <main className="container mx-auto px-4 py-8 -mt-16 relative z-10">
          <Tutorial />
          <GameInterface />
        </main>
        <Footer />
      </div>
    </GameProvider>
  );
};

export default CannabisGame;