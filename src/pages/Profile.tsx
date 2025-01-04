import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ProfileLayout } from "@/components/profile/ProfileLayout";
import { UserProfile, UserStats } from "@/types/profile";
import { useSocialFeatures } from "@/hooks/useSocialFeatures";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCard } from "@/components/social/UserCard";
import { AchievementCard } from "@/components/social/AchievementCard";
import { ChallengeCard } from "@/components/social/ChallengeCard";
import { LeaderboardCard } from "@/components/social/LeaderboardCard";

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    achievements,
    userAchievements,
    challenges,
    userChallenges,
    followers,
    following,
    joinChallenge,
  } = useSocialFeatures(profile?.id);

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
    <div className="min-h-screen bg-sage-50">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-sage-500 mb-8">Your Profile</h1>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <GameStatsSection stats={stats} />
                </div>
                <div className="lg:col-span-1">
                  <UserInfoSection
                    profile={profile}
                    onUpdate={handleProfileUpdate}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="achievements">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {achievements?.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    {...achievement}
                    unlocked={userAchievements?.some(
                      (ua) => ua.achievement_id === achievement.id
                    )}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="challenges">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {challenges?.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    {...challenge}
                    progress={
                      userChallenges?.find(
                        (uc) => uc.challenge_id === challenge.id
                      )
                        ? 100
                        : 0
                    }
                    onJoin={() => joinChallenge.mutate(challenge.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="social">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Following</h3>
                  {following?.map((follow) => (
                    <UserCard
                      key={follow.id}
                      profile={follow.profiles}
                      isFollowing={true}
                      onFollowToggle={() => {
                        // Refresh following list
                        queryClient.invalidateQueries({
                          queryKey: ['following', profile?.id],
                        });
                      }}
                    />
                  ))}
                </div>
                <div className="lg:col-span-1">
                  <LeaderboardCard
                    entries={[
                      // Example leaderboard data
                      { rank: 1, profile: { id: '1', display_name: 'User 1' }, points: 1000 },
                      { rank: 2, profile: { id: '2', display_name: 'User 2' }, points: 800 },
                      { rank: 3, profile: { id: '3', display_name: 'User 3' }, points: 600 },
                    ]}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
