import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StrainPairing } from "@/types/strain";
import { PairingCard } from "./PairingCard";
import { PairingCarousel } from "./PairingCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

const ITEMS_PER_PAGE = 6;

const RecentPairings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);

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
    queryKey: ['recent-pairings', currentPage],
    queryFn: async () => {
      const { data: pairings, error, count } = await supabase
        .from('strain_pairings')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((currentPage - 1) * ITEMS_PER_PAGE, (currentPage * ITEMS_PER_PAGE) - 1);
      
      if (error) throw error;
      
      return {
        pairings: pairings as StrainPairing[],
        totalCount: count || 0
      };
    }
  });

  const totalPages = Math.ceil((pairingsData?.totalCount || 0) / ITEMS_PER_PAGE);
  const pairings = pairingsData?.pairings || [];

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

  if (pairings.length === 0) {
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
        
        {isMobile ? (
          <PairingCarousel 
            pairings={pairings}
            onVote={handleVote}
            favorites={favorites}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {pairings.map((pair) => (
                <PairingCard 
                  key={pair.id}
                  pair={pair}
                  onVote={handleVote}
                  isFavorited={favorites.includes(pair.id)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default RecentPairings;