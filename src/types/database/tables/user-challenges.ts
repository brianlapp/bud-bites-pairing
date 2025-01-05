export interface UserChallengesTable {
  Row: {
    id: string;
    user_id: string;
    challenge_id: string;
    completed_at: string | null;
    created_at: string;
  };
  Insert: {
    id?: string;
    user_id: string;
    challenge_id: string;
    completed_at?: string | null;
    created_at?: string;
  };
  Update: {
    id?: string;
    user_id?: string;
    challenge_id?: string;
    completed_at?: string | null;
    created_at?: string;
  };
  Relationships: [
    {
      foreignKeyName: "user_challenges_challenge_id_fkey";
      columns: ["challenge_id"];
      referencedRelation: "challenges";
      referencedColumns: ["id"];
    },
    {
      foreignKeyName: "user_challenges_user_id_fkey";
      columns: ["user_id"];
      referencedRelation: "users";
      referencedColumns: ["id"];
    }
  ];
}