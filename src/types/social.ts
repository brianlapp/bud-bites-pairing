export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  achievement: Achievement;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  points: number;
}

export interface UserChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
  completed_at: string | null;
  challenge: Challenge;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}