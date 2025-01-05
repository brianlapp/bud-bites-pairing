export interface UserAchievementsTable {
  Row: {
    id: string;
    user_id: string;
    achievement_id: string;
    unlocked_at: string;
    created_at: string;
  };
  Insert: {
    id?: string;
    user_id: string;
    achievement_id: string;
    unlocked_at?: string;
    created_at?: string;
  };
  Update: {
    id?: string;
    user_id?: string;
    achievement_id?: string;
    unlocked_at?: string;
    created_at?: string;
  };
  Relationships: [
    {
      foreignKeyName: "user_achievements_achievement_id_fkey";
      columns: ["achievement_id"];
      referencedRelation: "achievements";
      referencedColumns: ["id"];
    },
    {
      foreignKeyName: "user_achievements_user_id_fkey";
      columns: ["user_id"];
      referencedRelation: "users";
      referencedColumns: ["id"];
    }
  ];
}