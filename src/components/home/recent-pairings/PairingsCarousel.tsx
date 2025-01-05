import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PairingCard } from "../PairingCard";
import { StrainPairing } from "@/types/strain";

interface PairingsCarouselProps {
  pairings: StrainPairing[];
  favorites: string[];
  onVote: (pairingId: string, isHelpful: boolean) => Promise<void>;
}

export const PairingsCarousel = ({ pairings, favorites, onVote }: PairingsCarouselProps) => (
  <Carousel
    opts={{
      align: "start",
      loop: true,
      dragFree: true,
    }}
    className="w-full"
  >
    <CarouselContent className="-ml-2 md:-ml-4">
      {pairings.map((pair) => (
        <CarouselItem key={pair.id} className="pl-2 md:pl-4 md:basis-1/3 basis-full">
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