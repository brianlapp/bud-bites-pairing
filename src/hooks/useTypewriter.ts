import { useState, useEffect } from "react";
import { calculateNextState, getNextTextIndex } from "@/utils/typewriterUtils";

interface UseTypewriterProps {
  texts: string[];
  speed?: number;
  initialDelay?: number;
  waitTime?: number;
  deleteSpeed?: number;
  loop?: boolean;
}

export const useTypewriter = ({
  texts,
  speed = 50,
  initialDelay = 0,
  waitTime = 2000,
  deleteSpeed = 30,
  loop = true,
}: UseTypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentText = texts[currentIndex];

    const startTyping = () => {
      const { text, delay } = calculateNextState(
        displayText,
        currentText,
        isDeleting,
        speed,
        deleteSpeed
      );

      if (isDeleting && text === "") {
        setIsDeleting(false);
        if (currentIndex === texts.length - 1 && !loop) return;
        
        const nextIndex = getNextTextIndex(currentIndex, texts, loop);
        setCurrentIndex(nextIndex);
        timeout = setTimeout(() => {}, waitTime);
        return;
      }

      if (!isDeleting && text === currentText) {
        if (texts.length > 1) {
          timeout = setTimeout(() => setIsDeleting(true), waitTime);
        }
        return;
      }

      setDisplayText(text);
    };

    if (currentIndex === 0 && !isDeleting && displayText === "") {
      timeout = setTimeout(startTyping, initialDelay);
    } else {
      startTyping();
    }

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    displayText,
    isDeleting,
    speed,
    deleteSpeed,
    waitTime,
    texts,
    loop,
  ]);

  return { displayText, currentIndex };
};