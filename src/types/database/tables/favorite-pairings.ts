export interface FavoritePairingsTable {
  Row: {
    id: string;
    user_id: string;
    pairing_id: string;
    created_at: string;
  };
  Insert: {
    id?: string;
    user_id: string;
    pairing_id: string;
    created_at?: string;
  };
  Update: {
    id?: string;
    user_id?: string;
    pairing_id?: string;
    created_at?: string;
  };
  Relationships: [
    {
      foreignKeyName: "favorite_pairings_pairing_id_fkey";
      columns: ["pairing_id"];
      referencedRelation: "strain_pairings";
      referencedColumns: ["id"];
    },
    {
      foreignKeyName: "favorite_pairings_user_id_fkey";
      columns: ["user_id"];
      referencedRelation: "users";
      referencedColumns: ["id"];
    }
  ];
}