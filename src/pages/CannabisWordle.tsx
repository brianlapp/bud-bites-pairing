import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import WordleGrid from "@/components/wordle/WordleGrid";
import Keyboard from "@/components/wordle/Keyboard";
import GameStats from "@/components/wordle/GameStats";
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
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-sage-500 to-sage-400 text-white pt-24 pb-32">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-sage-100"
          >
            Cannabis Wordle Challenge
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-8 text-sage-100"
          >
            Test your cannabis knowledge with our daily word puzzle! Guess the 5-letter word related to cannabis culture, strains, or terminology.
          </motion.p>
          
          {/* Quick Guide Steps */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-2">1. Daily Challenge</h3>
              <p className="text-sage-100">A new cannabis-themed word every 24 hours.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-2">2. Color Feedback</h3>
              <p className="text-sage-100">Green for correct, yellow for close, gray for incorrect.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-2">3. Six Attempts</h3>
              <p className="text-sage-100">Try to solve the puzzle in six tries or less.</p>
            </motion.div>
          </div>

          {/* Game Stats Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GameStats
              streak={streak}
              hintUsed={hintUsed}
              showHint={showHint}
            />
          </motion.div>
        </div>

        {/* Bottom wave SVG */}
        <div className="absolute -bottom-[1px] left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px]"
            style={{ transform: 'rotate(180deg)' }}
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-sage-50"
            />
          </svg>
        </div>
      </div>

      {/* Game Interface */}
      <main className="container mx-auto px-4 py-8 -mt-16 relative z-10">
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
      </main>
      <Footer />
    </div>
  );
};

export default CannabisWordle;
