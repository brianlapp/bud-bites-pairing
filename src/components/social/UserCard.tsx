import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@/types/social";
import { useToast } from "@/components/ui/use-toast";

interface UserCardProps {
  profile: UserProfile;
  isFollowing: boolean;
  onFollowToggle: () => void;
}

export const UserCard = ({ profile, isFollowing, onFollowToggle }: UserCardProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleFollowToggle = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Error",
          description: "You must be logged in to follow users",
          variant: "destructive",
        });
        return;
      }

      if (isFollowing) {
        const { error } = await supabase
          .from("follows")
          .delete()
          .eq("follower_id", session.user.id)
          .eq("following_id", profile.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("follows")
          .insert({
            follower_id: session.user.id,
            following_id: profile.id,
          });
        
        if (error) throw error;
      }

      onFollowToggle();
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });

      toast({
        title: "Success",
        description: isFollowing ? "Unfollowed successfully" : "Followed successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`} />
              <AvatarFallback>{profile.display_name?.[0] || '?'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{profile.display_name || 'Anonymous'}</p>
              <p className="text-sm text-muted-foreground">{profile.bio || 'No bio yet'}</p>
            </div>
          </div>
          <Button
            variant={isFollowing ? "outline" : "default"}
            onClick={handleFollowToggle}
            disabled={loading}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};