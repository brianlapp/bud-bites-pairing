import { motion } from "framer-motion";

interface WordGridProps {
  guesses: string[];
  currentGuess: string;
  targetWord: string;
  maxAttempts: number;
}

const WordGrid = ({ guesses, currentGuess, targetWord, maxAttempts }: WordGridProps) => {
  const emptyRows = Array(maxAttempts - guesses.length - 1).fill("");

Let's start by implementing the core game functionality. I'll create the necessary components and data structures for the Cannabis Wordle game.

<lov-code>
First, let's create the word list and game components:

<lov-write file_path="src/data/wordleWords.json">
{
  "words": [
    {
      "word": "KUSHY",
      "hint": "A term describing the distinctive aroma of Kush strains"
    },
    {
      "word": "HAZEY",
      "hint": "Related to the famous Haze family of strains"
    },
    {
      "word": "PURPS",
      "hint": "Refers to purple-colored cannabis varieties"
    },
    {
      "word": "RESIN",
      "hint": "Sticky substance produced by cannabis trichomes"
    },
    {
      "word": "TERPS",
      "hint": "Short for terpenes, aromatic compounds in cannabis"
    },
    {
      "word": "BLUNT",
      "hint": "A cannabis-filled cigar wrap"
    },
    {
      "word": "CHILL",
      "hint": "Common state of relaxation after cannabis use"
    },
    {
      "word": "TOKER",
      "hint": "Someone who consumes cannabis"
    },
    {
      "word": "JOINT",
      "hint": "Classic way to smoke cannabis"
    },
    {
      "word": "BONGS",
      "hint": "Popular water pipes for smoking"
    }
  ]
}