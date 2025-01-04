import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-grow"
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
          <Card className="max-w-2xl mx-auto shadow-lg">
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
                  <label htmlFor="name" className="block text-sm font-medium text-sage-600">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full border-sage-200 focus:ring-sage-500 focus:border-sage-500"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-sage-600">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full border-sage-200 focus:ring-sage-500 focus:border-sage-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-sage-600">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    className="w-full border-sage-200 focus:ring-sage-500 focus:border-sage-500"
                    placeholder="What's on your mind?"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-sage-500 hover:bg-sage-600 text-white transition-colors"
                >
                  Send Message
                </Button>
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