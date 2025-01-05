import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PairingCard } from "./PairingCard";
import { StrainPairing } from "@/types/strain";

interface PairingCarouselProps {
  pairings: StrainPairing[];
  onVote: (pairingId: string, isHelpful: boolean) => Promise<void>;
  favorites: string[];
}

export const PairingCarousel = ({ pairings, onVote, favorites }: PairingCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth;
    const scrollTo = direction === "left" 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: scrollTo,
      behavior: "smooth"
    });
  };

  return (
    <div className="relative w-full">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 px-4 pb-4 scrollbar-hide scroll-smooth"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {pairings.map((pair) => (
          <div 
            key={pair.id} 
            className="flex-none w-[280px]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <PairingCard
              pair={pair}
              onVote={onVote}
              isFavorited={favorites.includes(pair.id)}
            />
          </div>
        ))}
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};