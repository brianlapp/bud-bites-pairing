export interface CachedRecipeImagesTable {
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
  Relationships: [];
}