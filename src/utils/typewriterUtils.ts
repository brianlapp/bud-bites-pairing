export const calculateNextState = (
  currentText: string,
  targetText: string,
  isDeleting: boolean,
  speed: number,
  deleteSpeed: number
): {
  text: string;
  delay: number;
} => {
  if (isDeleting) {
    return {
      text: currentText.slice(0, -1),
      delay: deleteSpeed,
    };
  }
  
  return {
    text: targetText.slice(0, currentText.length + 1),
    delay: speed,
  };
};

export const getNextTextIndex = (
  currentIndex: number,
  texts: string[],
  loop: boolean
): number => {
  const nextIndex = currentIndex + 1;
  return loop ? nextIndex % texts.length : Math.min(nextIndex, texts.length - 1);
};