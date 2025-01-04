import { Card } from "@/components/ui/card";
import { ExpenseCategory } from "./types";

interface BudgetRecommendationsProps {
  income: string;
  expenses: ExpenseCategory[];
}

export const BudgetRecommendations = ({
  income,
  expenses,
}: BudgetRecommendationsProps) => {
  const calculateTotal = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const generateSavingsRecommendations = () => {
    const total = calculateTotal();
    const recommendations = [];

    if (total > Number(income) * 0.3) {
      recommendations.push(
        "Consider reducing cannabis expenses to 30% or less of your income."
      );
    }

    const highestExpense = expenses.reduce((prev, current) =>
      prev.amount > current.amount ? prev : current
    );

    if (highestExpense.amount > total * 0.5) {
      recommendations.push(
        `Consider diversifying your ${highestExpense.name.toLowerCase()} spending to other categories.`
      );
    }

    return recommendations;
  };

  return (
    <Card className="p-6 bg-white/90">
      <h4 className="text-lg font-semibold text-sage-500 mb-4">
        Savings Recommendations
      </h4>
      <ul className="list-disc list-inside space-y-2">
        {generateSavingsRecommendations().map((recommendation, index) => (
          <li key={index} className="text-sage-600">
            {recommendation}
          </li>
        ))}
      </ul>
    </Card>
  );
};