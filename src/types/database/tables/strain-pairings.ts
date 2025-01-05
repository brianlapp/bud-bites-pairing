export interface StrainPairingsTable {
  Row: {
    id: string;
    strain_name: string;
    pairing_suggestion: string;
    created_at: string;
    helpful_votes: number;
    not_helpful_votes: number;
  };
  Insert: {
    id?: string;
    strain_name: string;
    pairing_suggestion: string;
    created_at?: string;
    helpful_votes?: number;
    not_helpful_votes?: number;
  };
  Update: {
    id?: string;
    strain_name?: string;
    pairing_suggestion?: string;
    created_at?: string;
    helpful_votes?: number;
    not_helpful_votes?: number;
  };
  Relationships: [];
}