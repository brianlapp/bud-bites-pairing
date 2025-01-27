import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Achievement, Challenge, Follow, LeaderboardEntry } from "@/types/social";

export const useSocialFeatures = (userId?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: achievements = [] } = useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('achievements')
        .select('*');
      
      if (error) throw error;
      return data as Achievement[];
    },
  });

  const { data: userAchievements = [] } = useQuery({
    queryKey: ['user-achievements', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: challenges = [] } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('challenges')
        .select('*');
      
      if (error) throw error;
      return data as Challenge[];
    },
  });

  const { data: userChallenges = [] } = useQuery({
    queryKey: ['user-challenges', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('user_challenges')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: followers = [] } = useQuery({
    queryKey: ['followers', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('follows')
        .select(`
          *,
          follower:profiles!follows_follower_profile_fkey(*)
        `)
        .eq('following_id', userId);
      
      if (error) throw error;
      return data as Follow[];
    },
    enabled: !!userId,
  });

  const { data: following = [] } = useQuery({
    queryKey: ['following', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('follows')
        .select(`
          *,
          following:profiles!follows_following_profile_fkey(*)
        `)
        .eq('follower_id', userId);
      
      if (error) throw error;
      return data as Follow[];
    },
    enabled: !!userId,
  });

  const { data: leaderboardEntries = [] } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leaderboards')
        .select(`
          *,
          profile:profiles!leaderboards_profile_fkey(*)
        `)
        .order('score', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data as LeaderboardEntry[];
    },
  });

  const joinChallenge = useMutation({
    mutationFn: async (challengeId: string) => {
      if (!userId) throw new Error('User must be logged in to join challenges');
      
      const { error } = await supabase
        .from('user_challenges')
        .insert({
          user_id: userId,
          challenge_id: challengeId,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-challenges'] });
      toast({
        title: "Success",
        description: "You've joined the challenge!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to join challenge: " + error.message,
        variant: "destructive",
      });
    },
  });

  return {
    achievements,
    userAchievements,
    challenges,
    userChallenges,
    followers,
    following,
    leaderboardEntries,
    joinChallenge,
  };
};
