interface ColorGuideProps {
  className?: string;
}

export const ColorGuide = ({ className }: ColorGuideProps) => {
  return (
    <div className={`border-t border-sage-200 dark:border-sage-600 pt-4 mt-4 ${className}`}>
      <h4 className="text-sage-500 dark:text-sage-200 font-medium mb-3 text-center">
        Color Guide
      </h4>
      <div className="flex justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded"></div>
          <span className="text-sage-500 dark:text-sage-200 text-sm">
            Correct letter & position
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-500 rounded"></div>
          <span className="text-sage-500 dark:text-sage-200 text-sm">
            Correct letter, wrong position
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded"></div>
          <span className="text-sage-500 dark:text-sage-200 text-sm">
            Letter not in word
          </span>
        </div>
      </div>
    </div>
  );
};