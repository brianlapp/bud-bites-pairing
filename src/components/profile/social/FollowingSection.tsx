import { Follow } from "@/types/social";
import { UserCard } from "@/components/social/UserCard";
import { useQueryClient } from "@tanstack/react-query";

interface FollowingSectionProps {
  following: Follow[];
  profileId?: string;
}

export const FollowingSection = ({ following, profileId }: FollowingSectionProps) => {
  const queryClient = useQueryClient();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Following</h3>
      {following?.map((follow) => (
        <UserCard
          key={follow.id}
          profile={follow.following!}
          isFollowing={true}
          onFollowToggle={() => {
            queryClient.invalidateQueries({
              queryKey: ['following', profileId],
            });
          }}
        />
      ))}
    </div>
  );
};