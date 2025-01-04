import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordleGridProps {
  guesses: string[];
  currentGuess: string;
  targetWord: string;
  maxAttempts: number;
}

const WordleGrid = ({ guesses, currentGuess, targetWord, maxAttempts }: WordleGridProps) => {
  const emptyRows = Array(maxAttempts - guesses.length - 1).fill('');

  const getLetterColor = (letter: string, index: number, word: string) => {
    if (!letter) return "bg-sage-100 dark:bg-sage-900";
    if (targetWord[index] === letter) return "bg-green-500 text-white";
    if (targetWord.includes(letter)) return "bg-yellow-500 text-white";
    return "bg-gray-400 text-white dark:bg-gray-600";
  };

  return (
    <div className="grid gap-2 mx-auto max-w-sm">
      {guesses.map((guess, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          {guess.split('').map((letter, j) => (
            <motion.div
              key={`${i}-${j}`}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: 360 }}
              className={cn(
                "w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-lg border-2 border-sage-200",
                getLetterColor(letter, j, targetWord)
              )}
            >
              {letter}
            </motion.div>
          ))}
        </div>
      ))}
      
      {/* Current guess row */}
      {guesses.length < maxAttempts && (
        <div className="grid grid-cols-5 gap-2">
          {Array(5).fill('').map((_, i) => (
            <motion.div
              key={`current-${i}`}
              initial={{ scale: 1 }}
              animate={{ scale: currentGuess[i] ? 1.1 : 1 }}
              className="w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-lg border-2 border-sage-300 bg-white"
            >
              {currentGuess[i] || ''}
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty rows */}
      {emptyRows.map((_, i) => (
        <div key={`empty-${i}`} className="grid grid-cols-5 gap-2">
          {Array(5).fill('').map((_, j) => (
            <div
              key={`empty-${i}-${j}`}
              className="w-14 h-14 flex items-center justify-center rounded-lg border-2 border-sage-200 bg-sage-50"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordleGrid;