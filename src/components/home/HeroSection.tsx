import { Typewriter } from "@/components/ui/typewriter";
import { StrainForm } from "./StrainForm";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center space-y-4 animate-fade-up">
          <h1 className="text-4xl sm:text-6xl font-bold text-sage-500 tracking-tight pt-8">
            <span>Discover the perfect pairing for </span>
            <div className="h-[72px] sm:h-[96px] flex items-center justify-center">
              <Typewriter
                text={[
                  "Blue Dream 🌿",
                  "OG Kush 🍃",
                  "Sour Diesel 🚀",
                  "Purple Haze 💜",
                  "Girl Scout Cookies 🍪",
                ]}
                speed={70}
                className="text-coral-500"
                waitTime={1500}
                deleteSpeed={40}
                cursorChar="_"
              />
            </div>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-sage-400">
            Discover the perfect meal pairings for your favorite cannabis strains, curated by our AI sommelier.
          </p>
          
          <div className="flex items-center justify-center my-8">
            <div className="flex-grow max-w-xs">
              <hr className="border-t border-sage-300" 
                  style={{ 
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'14\' height=\'14\' viewBox=\'0 0 14 14\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M7 0C3.13 0 0 3.13 0 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm1 10H6V6h2v4zm0-5H6V3h2v2z\' fill=\'%232D4739\' fill-opacity=\'0.1\'/%3E%3C/svg%3E")',
                    height: '1px',
                    border: 'none'
                  }} 
              />
            </div>
            <div className="mx-4">
              <span className="inline-block w-8 h-8 text-sage-300 text-2xl">🍃</span>
            </div>
            <div className="flex-grow max-w-xs">
              <hr className="border-t border-sage-300"
                  style={{ 
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'14\' height=\'14\' viewBox=\'0 0 14 14\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M7 0C3.13 0 0 3.13 0 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm1 10H6V6h2v4zm0-5H6V3h2v2z\' fill=\'%232D4739\' fill-opacity=\'0.1\'/%3E%3C/svg%3E")',
                    height: '1px',
                    border: 'none'
                  }} 
              />
            </div>
          </div>

          <StrainForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;