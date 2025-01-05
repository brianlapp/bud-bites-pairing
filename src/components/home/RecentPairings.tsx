import { LoadingState } from "./recent-pairings/LoadingState";
import { PairingsCarousel } from "./recent-pairings/PairingsCarousel";
import { usePairingsData } from "./recent-pairings/usePairingsData";

const RecentPairings = () => {
  const { pairingsData, isPairingsLoading, favorites, handleVote } = usePairingsData();

  if (isPairingsLoading) {
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
        <div className="relative">
          <PairingsCarousel
            pairings={pairingsData}
            favorites={favorites}
            onVote={handleVote}
          />
        </div>
      </div>
    </section>
  );
};

export default RecentPairings;