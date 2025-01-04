import { useState, useEffect } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import WordleGrid from "@/components/wordle/WordleGrid";
import Keyboard from "@/components/wordle/Keyboard";
import { useToast } from "@/components/ui/use-toast";
import { useUserStats } from "@/hooks/useUserStats";
import wordleWords from "@/data/wordleWords.json";
import { WordleHero } from "@/components/wordle/WordleHero";
import { ColorGuide } from "@/components/wordle/stats/ColorGuide";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameWon || guesses.length >= maxAttempts) return;
      
      const key = event.key.toUpperCase();
      if (key === 'ENTER') {
        handleEnter();
      } else if (key === 'BACKSPACE') {
        handleBackspace();
      } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameWon, guesses.length]);

  return (
    <div className="min-h-screen bg-sage-50 dark:bg-sage-900">
      <Navigation />
      
      <WordleHero stats={stats} loading={loading} />
      
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <ColorGuide className="mb-4 bg-white dark:bg-sage-800 rounded-lg p-4 shadow-lg" />
          
          <div className="bg-white dark:bg-sage-800 rounded-lg shadow-lg p-6 mb-4">
            <WordleGrid
              guesses={guesses}
              currentGuess={currentGuess}
              targetWord={targetWord}
              maxAttempts={maxAttempts}
            />
          </div>

          <div className="bg-white dark:bg-sage-800 rounded-lg shadow-lg p-4">
            <div className="flex justify-center mb-4">
              {!hintUsed && (
                <Button
                  onClick={showHint}
                  variant="outline"
                  className="bg-sage-200 hover:bg-sage-300 dark:bg-sage-600 dark:hover:bg-sage-500 text-sage-500 dark:text-sage-200"
                >
                  <Sprout className="w-4 h-4 mr-2" />
                  Use Hint
                </Button>
              )}
            </div>
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
