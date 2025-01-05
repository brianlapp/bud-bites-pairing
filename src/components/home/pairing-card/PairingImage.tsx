import { useState } from "react";
import { cn } from "@/lib/utils";

interface PairingImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const PairingImage = ({ src, alt, className }: PairingImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-sage-100 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
};