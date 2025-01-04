import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ExpenseInput } from "./ExpenseInput";
import { BudgetCharts } from "./BudgetCharts";
import { BudgetRecommendations } from "./BudgetRecommendations";
import { BudgetData, ExpenseCategory, EXPENSE_CATEGORIES } from "./types";

export const BudgetPlanner = () => {
  const [income, setIncome] = useState<string>("");
  const [expenses, setExpenses] = useState<ExpenseCategory[]>(
    EXPENSE_CATEGORIES.map((name) => ({ name, amount: 0 }))
  );
  const [budgetHistory, setBudgetHistory] = useState<BudgetData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedBudgets = localStorage.getItem("budgetHistory");
    if (savedBudgets) {
      setBudgetHistory(JSON.parse(savedBudgets));
    }
  }, []);

  const handleExpenseChange = (index: number, value: string) => {
    const newExpenses = [...expenses];
    newExpenses[index].amount = Number(value) || 0;
    setExpenses(newExpenses);
  };

  const calculateTotal = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const saveBudget = () => {
    if (!income || isNaN(Number(income)) || Number(income) <= 0) {
      toast({
        title: "Invalid Income",
        description: "Please enter a valid income amount.",
        variant: "destructive",
      });
      return;
    }

    const total = calculateTotal();
    if (total === 0) {
      toast({
        title: "No Expenses",
        description: "Please enter at least one expense.",
        variant: "destructive",
      });
      return;
    }

    const newBudget: BudgetData = {
      income: Number(income),
      expenses: [...expenses],
      month: new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
    };

    const updatedHistory = [...budgetHistory, newBudget];
    setBudgetHistory(updatedHistory);
    localStorage.setItem("budgetHistory", JSON.stringify(updatedHistory));

    toast({
      title: "Budget Saved",
      description: "Your budget has been saved successfully.",
    });
  };

  const resetForm = () => {
    setIncome("");
    setExpenses(EXPENSE_CATEGORIES.map((name) => ({ name, amount: 0 })));
    toast({
      title: "Form Reset",
      description: "All fields have been cleared.",
    });
  };

  return (
    <Card className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg rounded-xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="income" className="text-sage-500">
            Monthly Income
          </Label>
          <Input
            id="income"
            type="number"
            placeholder="Enter your monthly income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="border-sage-200 focus:border-coral-500 focus:ring-coral-500"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-sage-500">Expenses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expenses.map((expense, index) => (
              <ExpenseInput
                key={expense.name}
                expense={expense}
                index={index}
                onChange={handleExpenseChange}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={saveBudget}
            className="flex-1 bg-coral-500 hover:bg-coral-600 text-white"
          >
            Save Budget
          </Button>
          <Button
            onClick={resetForm}
            variant="outline"
            className="flex-1 border-sage-200 text-sage-500 hover:bg-sage-50"
          >
            Reset
          </Button>
        </div>

        {budgetHistory.length > 0 && (
          <div className="space-y-8 mt-8 animate-fade-in">
            <h3 className="text-xl font-semibold text-sage-500">
              Budget Analysis
            </h3>

            <BudgetCharts expenses={expenses} budgetHistory={budgetHistory} />

            <BudgetRecommendations income={income} expenses={expenses} />
          </div>
        )}
      </div>
    </Card>
  );
};