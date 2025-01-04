import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Achievement, Challenge, Follow, UserAchievement, UserChallenge } from "@/types/social";
import { useToast } from "@/components/ui/use-toast";

export const useSocialFeatures = (userId: string | undefined) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: achievements = [] } = useQuery({
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

  const { data: userAchievements = [] } = useQuery({
    queryKey: ["user_achievements", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_achievements")
        .select("*, achievements(*)")
        .eq("user_id", userId);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: challenges = [] } = useQuery({
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

  const { data: userChallenges = [] } = useQuery({
    queryKey: ["user_challenges", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_challenges")
        .select("*, challenges(*)")
        .eq("user_id", userId);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: followers = [] } = useQuery({
    queryKey: ["followers", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("follows")
        .select("*, profiles!follower_id(*)")
        .eq("following_id", userId);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: following = [] } = useQuery({
    queryKey: ["following", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("follows")
        .select("*, profiles!following_id(*)")
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
    achievements,
    userAchievements,
    challenges,
    userChallenges,
    followers,
    following,
    joinChallenge,
  };
};