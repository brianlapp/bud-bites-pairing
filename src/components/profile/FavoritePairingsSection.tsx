import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StrainPairing } from "@/types/strain";

interface FavoritePairing extends StrainPairing {
  created_at: string;
}

export const FavoritePairingsSection = () => {
  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorite-pairings'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data: favoritePairings, error } = await supabase
        .from('favorite_pairings')
        .select(`
          pairing_id,
          created_at,
          strain_pairings (*)
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return favoritePairings.map(fp => ({
        ...fp.strain_pairings,
        created_at: fp.created_at,
      })) as FavoritePairing[];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-sage-500">Favorite Pairings</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Card key={i} className="animate-pulse bg-sage-100 h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!favorites?.length) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-sage-500">Favorite Pairings</h2>
        <Card className="bg-sage-50">
          <CardContent className="p-6 text-center text-sage-400">
            No favorite pairings yet
          </CardContent>
        </Card>
      </div>
    );
  }

  const cleanAndParseJSON = (jsonString: string) => {
    try {
      const cleaned = jsonString.replace(/```json\n|\n```/g, '');
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Error parsing pairing data:', error);
      return null;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-sage-500">Favorite Pairings</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {favorites.map((pairing) => {
          const pairingData = cleanAndParseJSON(pairing.pairing_suggestion);
          if (!pairingData) return null;

          return (
            <Link key={pairing.id} to={`/recipe/${pairing.id}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                    <span className="text-sm text-sage-400">
                      {new Date(pairing.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-500">{pairing.strain_name}</h3>
                    <p className="text-sm text-sage-400 line-clamp-2">
                      {pairingData.dishName}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};