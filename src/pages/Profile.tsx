import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { UserInfoSection } from "@/components/profile/UserInfoSection";
import { GameStatsSection } from "@/components/profile/GameStatsSection";
import { useToast } from "@/components/ui/use-toast";

export interface UserProfile {
  id: string;
  display_name: string | null;
  bio: string | null;
  favorite_strain: string | null;
}

export interface UserStats {
  wordle_games_played: number;
  wordle_streak: number;
  wordle_avg_guesses: number;
  tycoon_total_sales: number;
  tycoon_top_strain: string | null;
  tycoon_level: number;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to view your profile",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      try {
        const [profileResult, statsResult] = await Promise.all([
          supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single(),
          supabase
            .from("user_stats")
            .select("*")
            .eq("user_id", session.user.id)
            .single()
        ]);

        if (profileResult.error) throw profileResult.error;
        if (statsResult.error) throw statsResult.error;

        setProfile(profileResult.data);
        setStats(statsResult.data);
      } catch (error: any) {
        console.error("Error fetching profile data:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data: " + error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleProfileUpdate = async (updatedProfile: Partial<UserProfile>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Error",
          description: "You must be logged in to update your profile",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update(updatedProfile)
        .eq("id", session.user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updatedProfile } : null);
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile: " + error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sage-50">
        <Navigation />
        <main className="container mx-auto px-4 py-24">
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sage-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-sage-500 mb-8">Your Profile</h1>
          
          <div className="grid gap-8 md:grid-cols-2">
            <UserInfoSection
              profile={profile}
              onUpdate={handleProfileUpdate}
            />
            <GameStatsSection stats={stats} />
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;