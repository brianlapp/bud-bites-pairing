import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTypewriter } from "@/hooks/useTypewriter";

interface TypewriterProps {
  text: string | string[];
  speed?: number;
  initialDelay?: number;
  waitTime?: number;
  deleteSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorOnType?: boolean;
  cursorChar?: string | React.ReactNode;
  cursorClassName?: string;
  cursorAnimationVariants?: {
    initial: Variants["initial"];
    animate: Variants["animate"];
  };
  iconSrc?: string;
}

/**
 * Typewriter component that animates text with a typing effect
 * @param text - Single string or array of strings to type
 * @param speed - Typing speed in milliseconds (default: 50)
 * @param initialDelay - Delay before starting in milliseconds (default: 0)
 * @param waitTime - Time to wait between words in milliseconds (default: 2000)
 * @param deleteSpeed - Speed of deletion in milliseconds (default: 30)
 * @param loop - Whether to loop through texts (default: true)
 * @param className - Additional CSS classes
 * @param showCursor - Whether to show the cursor (default: true)
 * @param hideCursorOnType - Whether to hide cursor while typing (default: false)
 * @param cursorChar - Custom cursor character (default: "|")
 * @param cursorClassName - Additional CSS classes for cursor
 * @param cursorAnimationVariants - Custom animation variants for cursor
 * @param iconSrc - Optional icon to display after text
 */
export const Typewriter = ({
  text,
  speed = 50,
  initialDelay = 0,
  waitTime = 2000,
  deleteSpeed = 30,
  loop = true,
  className,
  showCursor = true,
  hideCursorOnType = false,
  cursorChar = "|",
  cursorClassName = "ml-1",
  cursorAnimationVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.01,
        repeat: Infinity,
        repeatDelay: 0.4,
        repeatType: "reverse",
      },
    },
  },
  iconSrc,
}: TypewriterProps) => {
  const texts = Array.isArray(text) ? text : [text];
  const { displayText, currentIndex } = useTypewriter({
    texts,
    speed,
    initialDelay,
    waitTime,
    deleteSpeed,
    loop,
  });

  // Find the longest text to ensure consistent width
  const longestText = texts.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    texts[0]
  );

  return (
    <motion.div
      className={`inline-flex items-center justify-center min-w-[${longestText.length}ch] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <span>{displayText}</span>
      {iconSrc && displayText === texts[currentIndex] && (
        <img src={iconSrc} alt="Icon" className="w-6 h-6 ml-1" />
      )}
      {showCursor && (
        <motion.span
          variants={cursorAnimationVariants}
          className={cn(
            cursorClassName,
            hideCursorOnType &&
              (displayText.length < texts[currentIndex].length || displayText === "")
              ? "hidden"
              : ""
          )}
          initial="initial"
          animate="animate"
        >
          {cursorChar}
        </motion.span>
      )}
    </motion.div>
  );
};