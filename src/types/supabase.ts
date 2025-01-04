import { Database as GeneratedDatabase } from "@/integrations/supabase/types";
import { SocialTables } from "./database/tables";

export interface Database extends Omit<GeneratedDatabase, 'public'> {
  public: {
    Tables: GeneratedDatabase['public']['Tables'] & SocialTables;
    Views: GeneratedDatabase['public']['Views'];
    Functions: GeneratedDatabase['public']['Functions'];
    Enums: GeneratedDatabase['public']['Enums'];
    CompositeTypes: GeneratedDatabase['public']['CompositeTypes'];
  };
}