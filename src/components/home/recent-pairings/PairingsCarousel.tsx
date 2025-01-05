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
import { cn } from "@/lib/utils";

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
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {pairings.map((pair) => (
            <CarouselItem key={pair.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
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
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {pairings.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-2 w-2 rounded-full bg-sage-300",
                index === 0 ? "bg-sage-500" : "bg-sage-300"
              )}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};