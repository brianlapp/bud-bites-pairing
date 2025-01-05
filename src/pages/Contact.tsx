import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

const Contact = () => {
  const completedFeatures = [
    "Strain & Meal Pairing System",
    "Cannabis Dosing Calculator",
    "Monthly Budget Planner",
    "Cannabis Tycoon Game",
    "Cannabis-Themed Wordle",
    "User Authentication",
    "Personal Pairing History",
    "Community Voting",
    "User Profiles",
    "Achievement System",
    "Social Feed",
    "Platform Optimization"
  ];

  const upcomingFeatures = [
    "Mobile App Development",
    "API Marketplace",
    "Premium Features",
    "International Expansion",
    "AI-powered Recommendations v2",
    "Voice Interface Integration"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-grow pt-16"
      >
        {/* Hero Section with Aurora Animation */}
        <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-sage-500/20 via-coral-500/20 to-sage-500/20 animate-aurora"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-sage-500 mb-4">Project Progress</h1>
            <p className="text-lg md:text-xl text-sage-400 max-w-2xl mx-auto">
              Track our journey and upcoming features. Have questions or suggestions? Get in touch! 🌿
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Completed Features */}
            <Card className="bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-sage-500 flex items-center gap-2">
                  <CheckCircle2 className="text-coral-500" />
                  Completed Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {completedFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sage-600">
                      <CheckCircle2 className="h-5 w-5 text-coral-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Upcoming Features */}
            <Card className="bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-sage-500 flex items-center gap-2">
                  <Circle className="text-sage-400" />
                  Coming Soon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {upcomingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sage-600">
                      <Circle className="h-5 w-5 text-sage-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-sage-500">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true"
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="contact" />
                
                <div className="space-y-2">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full px-6 py-4 rounded-lg border-2 border-sage-200 
                             focus:ring-2 focus:ring-coral-500 focus:border-transparent 
                             transition-all duration-300 bg-white/50 backdrop-blur-sm text-lg
                             placeholder:text-sage-400 text-sage-500
                             hover:border-coral-500/50"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full px-6 py-4 rounded-lg border-2 border-sage-200 
                             focus:ring-2 focus:ring-coral-500 focus:border-transparent 
                             transition-all duration-300 bg-white/50 backdrop-blur-sm text-lg
                             placeholder:text-sage-400 text-sage-500
                             hover:border-coral-500/50"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    className="w-full px-6 py-4 rounded-lg border-2 border-sage-200 
                             focus:ring-2 focus:ring-coral-500 focus:border-transparent 
                             transition-all duration-300 bg-white/50 backdrop-blur-sm text-lg
                             placeholder:text-sage-400 text-sage-500
                             hover:border-coral-500/50 min-h-[150px] resize-none"
                    placeholder="What's on your mind?"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center px-6 py-4 
                           border border-transparent text-lg font-medium rounded-lg 
                           text-white bg-coral-500 hover:bg-coral-600 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 
                           focus:ring-coral-500 transition-all duration-300 
                           shadow-md hover:shadow-lg"
                >
                  Send Message
                </motion.button>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Contact;