export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  created_at: string;
  achievement: Achievement;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  points: number;
  created_at: string;
}

export interface UserChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
  completed_at: string | null;
  created_at: string;
  challenge: Challenge;
}

export interface UserProfile {
  id: string;
  display_name: string | null;
  bio: string | null;
  favorite_strain: string | null;
  created_at: string;
  last_login: string;
  total_pairings_created: number | null;
  total_helpful_votes: number | null;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
  following_profile?: UserProfile;
  follower_profile?: UserProfile;
}