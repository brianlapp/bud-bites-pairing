import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { StrainPairing } from "@/types/strain";

export function useVirtualPairings(pairings: StrainPairing[]) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: pairings.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400, // Estimated height of each pairing card
    overscan: 5, // Number of items to render outside the visible area
  });

  const virtualItems = virtualizer.getVirtualItems();

  return {
    parentRef,
    virtualizer,
    virtualItems,
  };
}