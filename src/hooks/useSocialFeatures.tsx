import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Achievement, Challenge, Follow, UserAchievement, UserChallenge } from "@/types/social";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/types/supabase";

export const useSocialFeatures = (userId?: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: achievements } = useQuery<Achievement[]>({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('achievements')
        .select('*');
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: userAchievements } = useQuery<UserAchievement[]>({
    queryKey: ['user-achievements', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*, achievement:achievements(*)')
        .eq('user_id', userId);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: challenges } = useQuery<Challenge[]>({
    queryKey: ['challenges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .gte('end_date', new Date().toISOString());
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: userChallenges } = useQuery<UserChallenge[]>({
    queryKey: ['user-challenges', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_challenges')
        .select('*, challenge:challenges(*)')
        .eq('user_id', userId);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: followers } = useQuery<Follow[]>({
    queryKey: ['followers', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('follows')
        .select('*, follower_profile:profiles!follows_follower_id_fkey(*)')
        .eq('following_id', userId);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: following } = useQuery<Follow[]>({
    queryKey: ['following', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('follows')
        .select('*, following_profile:profiles!follows_following_id_fkey(*)')
        .eq('follower_id', userId);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const joinChallenge = useMutation({
    mutationFn: async (challengeId: string) => {
      const { error } = await supabase
        .from('user_challenges')
        .insert({ user_id: userId, challenge_id: challengeId });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-challenges', userId] });
      toast({
        title: "Success",
        description: "You've joined the challenge!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to join challenge",
        variant: "destructive",
      });
      console.error('Error joining challenge:', error);
    },
  });

  return {
    achievements,
    userAchievements,
    challenges,
    userChallenges,
    followers,
    following,
    joinChallenge,
  };
};