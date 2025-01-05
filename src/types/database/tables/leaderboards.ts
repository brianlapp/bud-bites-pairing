export interface LeaderboardsTable {
  Row: {
    id: string;
    user_id: string;
    category: string;
    score: number;
    month: string;
    created_at: string;
  };
  Insert: {
    id?: string;
    user_id: string;
    category: string;
    score: number;
    month?: string;
    created_at?: string;
  };
  Update: {
    id?: string;
    user_id?: string;
    category?: string;
    score?: number;
    month?: string;
    created_at?: string;
  };
  Relationships: [
    {
      foreignKeyName: "leaderboards_user_id_fkey";
      columns: ["user_id"];
      referencedRelation: "users";
      referencedColumns: ["id"];
    }
  ];
}