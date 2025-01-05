import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PairingCard } from "../PairingCard";
import { StrainPairing } from "@/types/strain";
import { useEffect } from "react";
import { usePrefetchStrainPairings } from "@/hooks/queries/useStrainPairings";

interface PairingsCarouselProps {
  pairings: StrainPairing[];
  favorites: string[];
  onVote: (pairingId: string, isHelpful: boolean) => Promise<void>;
}

export const PairingsCarousel = ({ pairings, favorites, onVote }: PairingsCarouselProps) => {
  const prefetchPairings = usePrefetchStrainPairings();

  useEffect(() => {
    prefetchPairings();
  }, [prefetchPairings]);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {pairings.map((pair) => (
          <CarouselItem key={pair.id} className="pl-2 md:pl-4 w-[280px] min-w-[280px]">
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
  );
};