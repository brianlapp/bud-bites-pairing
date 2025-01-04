import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import RecentPairings from "@/components/home/RecentPairings";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-sage-50">
      <Navigation />
      <HeroSection />
      <RecentPairings />
      <Footer />
    </div>
  );
};

export default Index;