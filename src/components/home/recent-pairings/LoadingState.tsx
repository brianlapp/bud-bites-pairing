import { Skeleton } from "@/components/ui/skeleton";

export const LoadingState = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <Skeleton className="h-[600px] w-full rounded-xl" />
    <Skeleton className="h-[600px] w-full rounded-xl" />
    <Skeleton className="h-[600px] w-full rounded-xl" />
  </div>
);