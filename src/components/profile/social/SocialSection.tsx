import { Follow, LeaderboardEntry } from "@/types/social";
import { FollowingSection } from "./FollowingSection";
import { LeaderboardCard } from "@/components/social/LeaderboardCard";

interface SocialSectionProps {
  following: Follow[];
  profileId?: string;
}

export const SocialSection = ({ following, profileId }: SocialSectionProps) => {
  const mockLeaderboardEntries: LeaderboardEntry[] = [
    { 
      id: '1',
      user_id: '1',
      category: 'wordle',
      score: 1000,
      month: new Date().toISOString(),
      created_at: new Date().toISOString(),
      profile: {
        id: '1',
        display_name: 'User 1',
        bio: null,
        favorite_strain: null,
        created_at: new Date().toISOString()
      }
    },
    { 
      id: '2',
      user_id: '2',
      category: 'wordle',
      score: 800,
      month: new Date().toISOString(),
      created_at: new Date().toISOString(),
      profile: {
        id: '2',
        display_name: 'User 2',
        bio: null,
        favorite_strain: null,
        created_at: new Date().toISOString()
      }
    },
    { 
      id: '3',
      user_id: '3',
      category: 'wordle',
      score: 600,
      month: new Date().toISOString(),
      created_at: new Date().toISOString(),
      profile: {
        id: '3',
        display_name: 'User 3',
        bio: null,
        favorite_strain: null,
        created_at: new Date().toISOString()
      }
    },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <FollowingSection following={following} profileId={profileId} />
      </div>
      <div className="lg:col-span-1">
        <LeaderboardCard entries={mockLeaderboardEntries} />
      </div>
    </div>
  );
};
