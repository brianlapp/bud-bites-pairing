export interface ProfilesTable {
  Row: {
    id: string;
    display_name: string | null;
    bio: string | null;
    favorite_strain: string | null;
    created_at: string;
    last_login: string;
    total_pairings_created: number | null;
    total_helpful_votes: number | null;
  };
  Insert: {
    id: string;
    display_name?: string | null;
    bio?: string | null;
    favorite_strain?: string | null;
    created_at?: string;
    last_login?: string;
    total_pairings_created?: number | null;
    total_helpful_votes?: number | null;
  };
  Update: {
    id?: string;
    display_name?: string | null;
    bio?: string | null;
    favorite_strain?: string | null;
    created_at?: string;
    last_login?: string;
    total_pairings_created?: number | null;
    total_helpful_votes?: number | null;
  };
  Relationships: [
    {
      foreignKeyName: "profiles_id_fkey";
      columns: ["id"];
      referencedRelation: "users";
      referencedColumns: ["id"];
    }
  ];
}