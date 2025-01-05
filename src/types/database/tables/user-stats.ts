export interface UserStatsTable {
  Row: {
    user_id: string;
    wordle_games_played: number | null;
    wordle_streak: number | null;
    wordle_avg_guesses: number | null;
    tycoon_total_sales: number | null;
    tycoon_top_strain: string | null;
    tycoon_level: number | null;
  };
  Insert: {
    user_id: string;
    wordle_games_played?: number | null;
    wordle_streak?: number | null;
    wordle_avg_guesses?: number | null;
    tycoon_total_sales?: number | null;
    tycoon_top_strain?: string | null;
    tycoon_level?: number | null;
  };
  Update: {
    user_id?: string;
    wordle_games_played?: number | null;
    wordle_streak?: number | null;
    wordle_avg_guesses?: number | null;
    tycoon_total_sales?: number | null;
    tycoon_top_strain?: string | null;
    tycoon_level?: number | null;
  };
  Relationships: [
    {
      foreignKeyName: "user_stats_user_id_fkey";
      columns: ["user_id"];
      referencedRelation: "users";
      referencedColumns: ["id"];
    }
  ];
}