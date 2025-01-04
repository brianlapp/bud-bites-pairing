import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StrainPairing } from "@/types/strain";
import { PairingCard } from "./PairingCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ITEMS_PER_PAGE = 3;

const RecentPairings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      if (!session?.user.id) return [];
      const { data, error } = await supabase
        .from('favorite_pairings')
        .select('pairing_id')
        .eq('user_id', session.user.id);
      
      if (error) throw error;
      return data.map(fav => fav.pairing_id);
    },
    enabled: !!session?.user.id,
  });

  const { data: pairingsData, isLoading: isPairingsLoading } = useQuery({
    queryKey: ['recent-pairings'],
    queryFn: async () => {
      const { data: pairings, error } = await supabase
        .from('strain_pairings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(ITEMS_PER_PAGE);
      
      if (error) throw error;
      return pairings as StrainPairing[];
    }
  });

  const handleVote = async (pairingId: string, isHelpful: boolean) => {
    try {
      const { error } = await supabase.rpc('increment', {
        row_id: pairingId,
        column_name: isHelpful ? 'helpful_votes' : 'not_helpful_votes'
      });

      if (error) throw error;

      toast({
        title: "Vote Recorded",
        description: "Thank you for your feedback!",
      });

      queryClient.invalidateQueries({ queryKey: ['recent-pairings'] });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to record your vote. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isPairingsLoading) {
    return (
      <section className="w-full py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-sage-500 mb-12">Recent Pairings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Skeleton className="h-[600px] w-full rounded-xl" />
            <Skeleton className="h-[600px] w-full rounded-xl" />
            <Skeleton className="h-[600px] w-full rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  if (!pairingsData || pairingsData.length === 0) {
    return (
      <section className="w-full py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-sage-500 mb-12">Recent Pairings</h2>
          <div className="text-center py-12 text-sage-400">
            No pairings generated yet. Be the first to create one!
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-sage-500 mb-12">Recent Pairings</h2>
        
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {pairingsData.map((pair) => (
                <CarouselItem key={pair.id} className="pl-2 md:pl-4 md:basis-1/3">
                  <div className="p-1">
                    <PairingCard
                      pair={pair}
                      onVote={handleVote}
                      isFavorited={favorites.includes(pair.id)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default RecentPairings;