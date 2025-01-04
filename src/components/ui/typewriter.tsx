import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string[];
  speed?: number;
  deleteSpeed?: number;
  waitTime?: number;
  className?: string;
  cursorChar?: string;
  iconSrc?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 50,
  deleteSpeed = 30,
  waitTime = 2000,
  className,
  cursorChar = "|",
  iconSrc,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentText = text[currentIndex];
    
    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, waitTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % text.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deleteSpeed);
      }
    } else {
      if (displayText === currentText) {
        setIsWaiting(true);
      } else {
        timeout = setTimeout(() => {
          setDisplayText((prev) => currentText.slice(0, prev.length + 1));
        }, speed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, isWaiting, text, speed, deleteSpeed, waitTime]);

  return (
    <div className="flex items-center justify-center space-x-2">
      {iconSrc && (
        <img 
          src={iconSrc} 
          alt="Icon" 
          className="w-8 h-8 object-contain"
        />
      )}
      <span className={cn("inline-block", className)}>
        {displayText}
        <span className="animate-pulse">{cursorChar}</span>
      </span>
    </div>
  );
};