import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Achievement, Challenge, Follow, UserAchievement, UserChallenge } from "@/types/social";
import { useToast } from "@/components/ui/use-toast";

export const useSocialFeatures = (userId: string | undefined) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: achievements } = useQuery<Achievement[]>({
    queryKey: ["achievements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("achievements")
        .select("*");
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: userAchievements } = useQuery<UserAchievement[]>({
    queryKey: ["user_achievements", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_achievements")
        .select(`
          *,
          achievement:achievements(*)
        `)
        .eq("user_id", userId);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: challenges } = useQuery<Challenge[]>({
    queryKey: ["challenges"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("challenges")
        .select("*");
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: userChallenges } = useQuery<UserChallenge[]>({
    queryKey: ["user_challenges", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_challenges")
        .select(`
          *,
          challenge:challenges(*)
        `)
        .eq("user_id", userId);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: followers } = useQuery<Follow[]>({
    queryKey: ["followers", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("follows")
        .select(`
          *,
          follower_profile:profiles!follower_id(*)
        `)
        .eq("following_id", userId);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: following } = useQuery<Follow[]>({
    queryKey: ["following", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("follows")
        .select(`
          *,
          following_profile:profiles!following_id(*)
        `)
        .eq("follower_id", userId);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const joinChallenge = useMutation({
    mutationFn: async (challengeId: string) => {
      const { error } = await supabase
        .from("user_challenges")
        .insert({
          user_id: userId,
          challenge_id: challengeId,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_challenges", userId] });
      toast({
        title: "Success",
        description: "Successfully joined the challenge!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    achievements: achievements || [],
    userAchievements: userAchievements || [],
    challenges: challenges || [],
    userChallenges: userChallenges || [],
    followers: followers || [],
    following: following || [],
    joinChallenge,
  };
};