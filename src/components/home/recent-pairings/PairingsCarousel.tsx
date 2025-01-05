import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PairingCard } from "../PairingCard";
import { StrainPairing } from "@/types/strain";
import { useEffect, useState } from "react";
import { usePrefetchStrainPairings } from "@/hooks/queries/useStrainPairings";
import { Button } from "@/components/ui/button";
import { type CarouselApi } from "@/components/ui/carousel";

interface PairingsCarouselProps {
  pairings: StrainPairing[];
  favorites: string[];
  onVote: (pairingId: string, isHelpful: boolean) => Promise<void>;
}

export const PairingsCarousel = ({ pairings, favorites, onVote }: PairingsCarouselProps) => {
  const prefetchPairings = usePrefetchStrainPairings();
  const [currentPage, setCurrentPage] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const totalPages = Math.ceil(pairings.length / 3); // Assuming 3 items per page on desktop

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentPage(api.selectedScrollSnap());
    });
  }, [api]);

  // Prefetch next batch of pairings when component mounts
  useEffect(() => {
    prefetchPairings();
  }, [prefetchPairings]);

  const handlePageChange = (index: number) => {
    if (!api) return;
    api.scrollTo(index);
  };

  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {pairings.map((pair) => (
            <CarouselItem key={pair.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <PairingCard
                  pair={pair}
                  onVote={onVote}
                  isFavorited={favorites.includes(pair.id)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
      
      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`w-2 h-2 p-0 rounded-full ${
              currentPage === index ? "bg-sage-500" : "bg-sage-200"
            }`}
            onClick={() => handlePageChange(index)}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};