import { Typewriter } from "@/components/ui/typewriter";
import { StrainForm } from "./StrainForm";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center space-y-4 animate-fade-up">
          <h1 className="text-4xl sm:text-6xl font-bold text-sage-500 tracking-tight">
            <span>Discover the perfect pairing for </span>
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
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-sage-400 mb-8">
            Discover the perfect meal pairings for your favorite cannabis strains, curated by our AI sommelier.
          </p>
          <StrainForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;