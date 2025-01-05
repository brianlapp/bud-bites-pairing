import { LoadingState } from "./recent-pairings/LoadingState";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import { useStrainPairings } from "@/hooks/queries/useStrainPairings";
import { usePairingsData } from "./recent-pairings/usePairingsData";
import { PairingsCarousel } from "./recent-pairings/PairingsCarousel";
import { useToast } from "@/hooks/use-toast";

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
  const { data: pairingsData, isLoading, error } = useStrainPairings();
  const { favorites, handleVote } = usePairingsData();
  const { toast } = useToast();

  // Show error toast if query fails
  if (error) {
    toast({
      title: "Error loading pairings",
      description: "There was an error loading the recent pairings. Please try again later.",
      variant: "destructive",
    });
  }

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
          <PairingsCarousel
            pairings={pairingsData}
            favorites={favorites}
            onVote={handleVote}
          />
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default RecentPairings;