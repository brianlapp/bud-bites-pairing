export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      favorite_pairings: {
        Row: {
          created_at: string
          id: string
          pairing_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          pairing_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          pairing_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_pairings_pairing_id_fkey"
            columns: ["pairing_id"]
            isOneToOne: false
            referencedRelation: "strain_pairings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string
          display_name: string | null
          favorite_strain: string | null
          id: string
          last_login: string
          total_helpful_votes: number | null
          total_pairings_created: number | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_name?: string | null
          favorite_strain?: string | null
          id: string
          last_login?: string
          total_helpful_votes?: number | null
          total_pairings_created?: number | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_name?: string | null
          favorite_strain?: string | null
          id?: string
          last_login?: string
          total_helpful_votes?: number | null
          total_pairings_created?: number | null
        }
        Relationships: []
      }
      strain_pairings: {
        Row: {
          created_at: string
          helpful_votes: number
          id: string
          not_helpful_votes: number
          pairing_suggestion: string
          strain_name: string
        }
        Insert: {
          created_at?: string
          helpful_votes?: number
          id?: string
          not_helpful_votes?: number
          pairing_suggestion: string
          strain_name: string
        }
        Update: {
          created_at?: string
          helpful_votes?: number
          id?: string
          not_helpful_votes?: number
          pairing_suggestion?: string
          strain_name?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          tycoon_level: number | null
          tycoon_top_strain: string | null
          tycoon_total_sales: number | null
          user_id: string
          wordle_avg_guesses: number | null
          wordle_games_played: number | null
          wordle_streak: number | null
        }
        Insert: {
          tycoon_level?: number | null
          tycoon_top_strain?: string | null
          tycoon_total_sales?: number | null
          user_id: string
          wordle_avg_guesses?: number | null
          wordle_games_played?: number | null
          wordle_streak?: number | null
        }
        Update: {
          tycoon_level?: number | null
          tycoon_top_strain?: string | null
          tycoon_total_sales?: number | null
          user_id?: string
          wordle_avg_guesses?: number | null
          wordle_games_played?: number | null
          wordle_streak?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment: {
        Args: {
          row_id: string
          column_name: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
