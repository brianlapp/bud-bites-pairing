export interface UserProfile {
  id: string;
  display_name: string | null;
  bio: string | null;
  favorite_strain: string | null;
}

export interface UserStats {
  wordle_games_played: number;
  wordle_streak: number;
  wordle_avg_guesses: number;
  tycoon_total_sales: number;
  tycoon_top_strain: string | null;
  tycoon_level: number;
}