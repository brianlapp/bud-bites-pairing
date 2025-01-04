import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface ExpenseCategory {
  name: string;
  amount: number;
}

interface BudgetData {
  income: number;
  expenses: ExpenseCategory[];
  month: string;
}

const COLORS = ["#2D4739", "#7d9186", "#a3b3aa", "#FF7F5C"];

const EXPENSE_CATEGORIES = [
  "Flower",
  "Edibles",
  "Concentrates",
  "Accessories",
];

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
      month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
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

  const generateSavingsRecommendations = () => {
    const total = calculateTotal();
    const recommendations = [];

    if (total > Number(income) * 0.3) {
      recommendations.push("Consider reducing cannabis expenses to 30% or less of your income.");
    }

    const highestExpense = expenses.reduce((prev, current) => 
      prev.amount > current.amount ? prev : current
    );

    if (highestExpense.amount > total * 0.5) {
      recommendations.push(`Consider diversifying your ${highestExpense.name.toLowerCase()} spending to other categories.`);
    }

    return recommendations;
  };

  return (
    <Card className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg rounded-xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="income" className="text-sage-500">Monthly Income</Label>
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
              <div key={expense.name} className="space-y-2">
                <Label htmlFor={`expense-${index}`} className="text-sage-500">{expense.name}</Label>
                <Input
                  id={`expense-${index}`}
                  type="number"
                  placeholder={`Enter ${expense.name.toLowerCase()} expenses`}
                  value={expense.amount || ""}
                  onChange={(e) => handleExpenseChange(index, e.target.value)}
                  className="border-sage-200 focus:border-coral-500 focus:ring-coral-500"
                />
              </div>
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
            <h3 className="text-xl font-semibold text-sage-500">Budget Analysis</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-4 bg-white/90">
                <h4 className="text-lg font-medium text-sage-500 mb-4">Expense Breakdown</h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenses}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {expenses.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-4 bg-white/90">
                <h4 className="text-lg font-medium text-sage-500 mb-4">Monthly Trends</h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={budgetHistory}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="income" name="Income" fill="#2D4739" />
                      <Bar 
                        dataKey={(data) => data.expenses.reduce((sum, exp) => sum + exp.amount, 0)} 
                        name="Total Expenses" 
                        fill="#FF7F5C" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

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
          </div>
        )}
      </div>
    </Card>
  );
};