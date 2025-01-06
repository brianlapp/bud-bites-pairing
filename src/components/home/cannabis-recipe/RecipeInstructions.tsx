interface RecipeInstructionsProps {
  instructions: string[];
  title: string;
  icon: React.ReactNode;
}

export const RecipeInstructions = ({ instructions, title, icon }: RecipeInstructionsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-sage-600 dark:text-sage-200 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <div className="space-y-3">
        {instructions.map((step, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-sage-100 
                     dark:bg-sage-800/30 dark:border-sage-700"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 text-sm font-medium dark:bg-sage-700 dark:text-sage-300">
              {index + 1}
            </span>
            <p className="text-sage-500 dark:text-sage-300 text-left">{step.trim()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};