import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/profile";
import { useState } from "react";

interface UserCardProps {
  profile: UserProfile;
  isFollowing: boolean;
  onFollowToggle?: () => void;
}

export const UserCard = ({ profile, isFollowing, onFollowToggle }: UserCardProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFollowToggle = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to follow users",
          variant: "destructive",
        });
        return;
      }

      if (isFollowing) {
        await supabase
          .from('follows')
          .delete()
          .eq('follower_id', session.user.id)
          .eq('following_id', profile.id);
      } else {
        await supabase
          .from('follows')
          .insert({
            follower_id: session.user.id,
            following_id: profile.id,
          });
      }

      onFollowToggle?.();
      
      toast({
        title: isFollowing ? "Unfollowed" : "Following",
        description: isFollowing ? `You unfollowed ${profile.display_name}` : `You are now following ${profile.display_name}`,
      });
    } catch (error) {
      console.error('Error toggling follow:', error);
      toast({
        title: "Error",
        description: "Failed to update follow status",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`} />
              <AvatarFallback>{profile.display_name?.[0] || '?'}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{profile.display_name || 'Anonymous'}</h3>
              <p className="text-sm text-sage-500">{profile.bio || 'No bio yet'}</p>
            </div>
          </div>
          <Button
            variant={isFollowing ? "outline" : "default"}
            size="sm"
            onClick={handleFollowToggle}
            disabled={loading}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};