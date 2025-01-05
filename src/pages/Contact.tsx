import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("https://formspree.io/f/xpzvgwrj", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. We'll get back to you soon!",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className="text-4xl md:text-5xl font-bold text-sage-500 mb-4">Get in Touch</h1>
            <p className="text-lg md:text-xl text-sage-400 max-w-2xl mx-auto">
              Whether you're looking to collaborate, have questions about our tools, or just want to share your favorite strain pairing – we're all ears! 🌿
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-sage-500">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form 
                onSubmit={handleSubmit}
                className="space-y-6"
              >
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
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center px-6 py-4 
                           border border-transparent text-lg font-medium rounded-lg 
                           text-white bg-coral-500 hover:bg-coral-600 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 
                           focus:ring-coral-500 transition-all duration-300 
                           shadow-md hover:shadow-lg disabled:opacity-50 
                           disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
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