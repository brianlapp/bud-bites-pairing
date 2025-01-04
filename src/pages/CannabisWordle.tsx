import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import WordleGrid from "@/components/wordle/WordleGrid";
import Keyboard from "@/components/wordle/Keyboard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import wordleWords from "@/data/wordleWords.json";

const CannabisWordle = () => {
  const { toast } = useToast();
  const [targetWord, setTargetWord] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [hint, setHint] = useState("");
  const [hintUsed, setHintUsed] = useState(false);
  const [usedLetters, setUsedLetters] = useState<Record<string, string>>({});
  const maxAttempts = 6;

  useEffect(() => {
    const dailyWord = getDailyWord();
    setTargetWord(dailyWord.word);
    setHint(dailyWord.hint);
  }, []);

  const getDailyWord = () => {
    const today = new Date().toISOString().split('T')[0];
    const savedWord = localStorage.getItem(`wordle-word-${today}`);
    
    if (savedWord) {
      return JSON.parse(savedWord);
    }

    const randomWord = wordleWords.words[Math.floor(Math.random() * wordleWords.words.length)];
    localStorage.setItem(`wordle-word-${today}`, JSON.stringify(randomWord));
    return randomWord;
  };

  const handleKeyPress = (key: string) => {
    if (currentGuess.length < 5 && !gameWon) {
      setCurrentGuess(prev => prev + key);
    }
  };

  const handleBackspace = () => {
    setCurrentGuess(prev => prev.slice(0, -1));
  };

  const updateUsedLetters = (guess: string) => {
    const newUsedLetters = { ...usedLetters };
    
    guess.split('').forEach((letter, index) => {
      if (targetWord[index] === letter) {
        newUsedLetters[letter] = 'correct';
      } else if (targetWord.includes(letter) && newUsedLetters[letter] !== 'correct') {
        newUsedLetters[letter] = 'present';
      } else if (!targetWord.includes(letter)) {
        newUsedLetters[letter] = 'absent';
      }
    });

    setUsedLetters(newUsedLetters);
  };

  const handleEnter = () => {
    if (currentGuess.length !== 5) {
      toast({
        title: "Invalid guess",
        description: "Please enter a 5-letter word",
        variant: "destructive",
      });
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    updateUsedLetters(currentGuess);

    if (currentGuess === targetWord) {
      setGameWon(true);
      toast({
        title: "Congratulations! 🎉",
        description: `You won in ${newGuesses.length} ${newGuesses.length === 1 ? 'try' : 'tries'}!`,
      });
      updateStreak();
    } else if (newGuesses.length >= maxAttempts) {
      toast({
        title: "Game Over",
        description: `The word was ${targetWord}`,
        variant: "destructive",
      });
      resetStreak();
    }

    setCurrentGuess("");
  };

  const showHint = () => {
    if (!hintUsed) {
      setHintUsed(true);
      toast({
        title: "Hint",
        description: hint,
      });
    }
  };

  const updateStreak = () => {
    const currentStreak = parseInt(localStorage.getItem('wordle-streak') || '0');
    const lastPlayed = localStorage.getItem('wordle-last-played');
    const today = new Date().toISOString().split('T')[0];

    if (lastPlayed === today) return;

    if (lastPlayed) {
      const lastDate = new Date(lastPlayed);
      const currentDate = new Date(today);
      const dayDiff = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (dayDiff === 1) {
        localStorage.setItem('wordle-streak', (currentStreak + 1).toString());
      } else {
        localStorage.setItem('wordle-streak', '1');
      }
    } else {
      localStorage.setItem('wordle-streak', '1');
    }

    localStorage.setItem('wordle-last-played', today);
  };

  const resetStreak = () => {
    localStorage.setItem('wordle-streak', '0');
    localStorage.setItem('wordle-last-played', new Date().toISOString().split('T')[0]);
  };

  const streak = parseInt(localStorage.getItem('wordle-streak') || '0');

  return (
    <div className="min-h-screen bg-sage-50 dark:bg-sage-900">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-sage-500 dark:text-sage-300 mb-4">
              Cannabis Wordle
            </h1>
            <div className="flex justify-center items-center gap-4 mb-4">
              <p className="text-sage-600 dark:text-sage-400">
                Daily Streak: {streak}
              </p>
              {!hintUsed && (
                <Button
                  onClick={showHint}
                  variant="outline"
                  className="bg-sage-100 hover:bg-sage-200 dark:bg-sage-800 dark:hover:bg-sage-700"
                >
                  Use Hint
                </Button>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-sage-800 rounded-lg shadow-lg p-8 mb-8">
            <WordleGrid
              guesses={guesses}
              currentGuess={currentGuess}
              targetWord={targetWord}
              maxAttempts={maxAttempts}
            />
          </div>

          <div className="bg-white dark:bg-sage-800 rounded-lg shadow-lg p-4">
            <Keyboard
              onKeyPress={handleKeyPress}
              onEnter={handleEnter}
              onBackspace={handleBackspace}
              usedLetters={usedLetters}
            />
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default CannabisWordle;