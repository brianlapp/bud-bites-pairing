import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ProfileLayout } from "@/components/profile/ProfileLayout";
import { UserProfile, UserStats } from "@/types/profile";

/**
 * Profile Page Component
 * 
 * Manages user profile data and stats, with real-time updates and authentication.
 * Displays user information and game statistics in a responsive layout.
 */
const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Authentication and data fetching
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
        // Fetch profile and stats data in parallel
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

    // Set up real-time auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  /**
   * Updates the user's profile information in Supabase
   * @param updatedProfile - Partial profile data to update
   */
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

  return (
    <ProfileLayout
      loading={loading}
      profile={profile}
      stats={stats}
      onProfileUpdate={handleProfileUpdate}
    />
  );
};

export default Profile;