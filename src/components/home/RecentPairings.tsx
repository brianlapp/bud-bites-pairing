import { LoadingState } from "./recent-pairings/LoadingState";
import { PairingCard } from "./PairingCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import { useStrainPairings } from "@/hooks/queries/useStrainPairings";
import { usePairingsData } from "./recent-pairings/usePairingsData";
import { useVirtualPairings } from "./recent-pairings/useVirtualPairings";

const ErrorFallback = () => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Failed to load recent pairings. Please try refreshing the page.
    </AlertDescription>
  </Alert>
);

const RecentPairings = () => {
  const { data: pairingsData, isLoading } = useStrainPairings();
  const { favorites, handleVote } = usePairingsData();
  const { parentRef, virtualizer, virtualItems } = useVirtualPairings(pairingsData || []);

  if (isLoading) {
    return (
      <section className="w-full py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-sage-500 mb-12">Recent Pairings</h2>
          <LoadingState />
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
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div 
            ref={parentRef} 
            className="h-[600px] overflow-auto"
            style={{
              contain: "strict",
            }}
          >
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {virtualItems.map((virtualItem) => {
                const pair = pairingsData[virtualItem.index];
                return (
                  <div
                    key={pair.id}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                    className="p-4"
                  >
                    <div className="h-full">
                      <PairingCard
                        pair={pair}
                        onVote={handleVote}
                        isFavorited={favorites.includes(pair.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default RecentPairings;
