export interface AchievementsTable {
  Row: {
    id: string;
    name: string;
    description: string;
    icon: string;
    points: number;
    created_at: string;
  };
  Insert: {
    id?: string;
    name: string;
    description: string;
    icon: string;
    points: number;
    created_at?: string;
  };
  Update: {
    id?: string;
    name?: string;
    description?: string;
    icon?: string;
    points?: number;
    created_at?: string;
  };
  Relationships: [];
}