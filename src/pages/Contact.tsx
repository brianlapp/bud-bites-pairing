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
        className="flex-grow container mx-auto px-4 py-8"
      >
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-sage-700 mb-8">Contact Us</h1>
          <form 
            name="contact" 
            method="POST" 
            data-netlify="true"
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-sage-600">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-sage-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-sage-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-sage-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-sage-600">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-sage-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Contact;