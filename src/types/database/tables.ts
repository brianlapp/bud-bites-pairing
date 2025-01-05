import { Database as GeneratedDatabase } from "@/integrations/supabase/types";

export interface SocialTables {
  follows: {
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
  };
  achievements: {
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
  };
  user_achievements: {
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
  };
  challenges: {
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
  };
  user_challenges: {
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
      created_at: string;
    };
    Update: {
      id?: string;
      user_id?: string;
      challenge_id?: string;
      completed_at?: string | null;
      created_at?: string;
    };
  };
  cached_recipe_images: {
    Row: {
      id: string;
      dish_name: string;
      description: string;
      image_path: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      dish_name: string;
      description: string;
      image_path: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      dish_name?: string;
      description?: string;
      image_path?: string;
      created_at?: string;
    };
  };
}
