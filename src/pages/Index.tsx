import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import RecentPairings from "@/components/home/RecentPairings";
import GetUserId from "@/components/admin/GetUserId";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-sage-50">
      <Navigation />
      <HeroSection />
      <GetUserId />
      <RecentPairings />
      <Footer />
    </div>
  );
};

export default Index;