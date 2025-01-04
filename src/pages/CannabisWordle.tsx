import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import WordleGrid from "@/components/wordle/WordleGrid";
import Keyboard from "@/components/wordle/Keyboard";
import { WordleStats } from "@/components/wordle/WordleStats";
import GameStats from "@/components/wordle/GameStats";
import { useToast } from "@/components/ui/use-toast";
import { useUserStats } from "@/hooks/useUserStats";
import wordleWords from "@/data/wordleWords.json";

const CannabisWordle = () => {
  const { toast } = useToast();
  const { stats, loading, updateStats } = useUserStats();
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
    if (gameWon || guesses.length >= maxAttempts) return;
    if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key.toUpperCase());
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

  const handleEnter = async () => {
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
      const newStats = {
        wordle_games_played: (stats?.wordle_games_played || 0) + 1,
        wordle_streak: (stats?.wordle_streak || 0) + 1,
        wordle_avg_guesses: stats ? 
          ((stats.wordle_avg_guesses || 0) * stats.wordle_games_played + newGuesses.length) / (stats.wordle_games_played + 1) : 
          newGuesses.length
      };
      
      await updateStats(newStats);

      toast({
        title: "Congratulations! 🎉",
        description: `You won in ${newGuesses.length} ${newGuesses.length === 1 ? 'try' : 'tries'}!`,
      });
    } else if (newGuesses.length >= maxAttempts) {
      await updateStats({
        wordle_games_played: (stats?.wordle_games_played || 0) + 1,
        wordle_streak: 0,
      });

      toast({
        title: "Game Over",
        description: `The word was ${targetWord}`,
        variant: "destructive",
      });
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

  return (
    <div className="min-h-screen bg-sage-50 dark:bg-sage-900">
      <Navigation />
      
      {/* Hero Section with Instructions */}
      <div className="relative bg-gradient-to-b from-sage-500 to-sage-400 text-white pt-24 pb-32">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-sage-100"
          >
            Cannabis Wordle Challenge
          </motion.h1>
          
          {/* Instructions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white/90"
          >
            <h2 className="text-xl font-semibold mb-4">How to Play</h2>
            <ul className="space-y-2">
              <li>• Guess the 5-letter cannabis-related word</li>
              <li>• Each guess must be a valid word</li>
              <li>• Colors will show how close your guess was</li>
              <li>• You have 6 attempts to guess the word</li>
            </ul>
          </motion.div>
          
          {/* Stats Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <WordleStats stats={stats} loading={loading} />
          </div>

          {/* Game Interface */}
          <div className="bg-white dark:bg-sage-800 rounded-lg shadow-lg p-8 mb-8">
            <WordleGrid
              guesses={guesses}
              currentGuess={currentGuess}
              targetWord={targetWord}
              maxAttempts={maxAttempts}
            />
          </div>

          {/* Game Stats and Color Guide */}
          <GameStats
            streak={stats?.wordle_streak || 0}
            hintUsed={hintUsed}
            showHint={showHint}
          />

          <div className="bg-white dark:bg-sage-800 rounded-lg shadow-lg p-4 mt-8">
            <Keyboard
              onKeyPress={handleKeyPress}
              onEnter={handleEnter}
              onBackspace={handleBackspace}
              usedLetters={usedLetters}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CannabisWordle;