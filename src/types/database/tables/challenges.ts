export interface ChallengesTable {
  Row: {
    id: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    points: number;
    created_at: string;
  };
  Insert: {
    id?: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    points: number;
    created_at?: string;
  };
  Update: {
    id?: string;
    title?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    points?: number;
    created_at?: string;
  };
  Relationships: [];
}