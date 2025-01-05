export interface FollowsTable {
  Row: {
    id: string;
    follower_id: string;
    following_id: string;
    created_at: string;
  };
  Insert: {
    id?: string;
    follower_id: string;
    following_id: string;
    created_at?: string;
  };
  Update: {
    id?: string;
    follower_id?: string;
    following_id?: string;
    created_at?: string;
  };
  Relationships: [
    {
      foreignKeyName: "follows_follower_id_fkey";
      columns: ["follower_id"];
      referencedRelation: "users";
      referencedColumns: ["id"];
    },
    {
      foreignKeyName: "follows_following_id_fkey";
      columns: ["following_id"];
      referencedRelation: "users";
      referencedColumns: ["id"];
    }
  ];
}