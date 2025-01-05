export interface PairingVotesTable {
  Row: {
    id: string;
    user_id: string;
    pairing_id: string;
    is_helpful: boolean;
    created_at: string;
  };
  Insert: {
    id?: string;
    user_id: string;
    pairing_id: string;
    is_helpful: boolean;
    created_at?: string;
  };
  Update: {
    id?: string;
    user_id?: string;
    pairing_id?: string;
    is_helpful?: boolean;
    created_at?: string;
  };
  Relationships: [
    {
      foreignKeyName: "pairing_votes_pairing_id_fkey";
      columns: ["pairing_id"];
      referencedRelation: "strain_pairings";
      referencedColumns: ["id"];
    },
    {
      foreignKeyName: "pairing_votes_user_id_fkey";
      columns: ["user_id"];
      referencedRelation: "users";
      referencedColumns: ["id"];
    }
  ];
}