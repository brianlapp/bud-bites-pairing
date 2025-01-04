import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  usedLetters: Record<string, string>;
}

const Keyboard = ({ onKeyPress, onEnter, onBackspace, usedLetters }: KeyboardProps) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
  ];

  const getKeyColor = (key: string) => {
    if (!usedLetters[key]) return "bg-sage-100 hover:bg-sage-200";
    switch (usedLetters[key]) {
      case 'correct':
        return "bg-green-500 text-white";
      case 'present':
        return "bg-yellow-500 text-white";
      case 'absent':
        return "bg-gray-400 text-white dark:bg-gray-600";
      default:
        return "bg-sage-100 hover:bg-sage-200";
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-2">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 my-1">
          {row.map((key) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (key === 'ENTER') onEnter();
                else if (key === '⌫') onBackspace();
                else onKeyPress(key);
              }}
              className={cn(
                "px-3 py-4 rounded-lg text-sm font-bold transition-colors",
                key === 'ENTER' || key === '⌫' ? "px-4" : "px-3",
                getKeyColor(key)
              )}
            >
              {key}
            </motion.button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;