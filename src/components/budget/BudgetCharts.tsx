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
import { Card } from "@/components/ui/card";
import { BudgetData, ExpenseCategory, COLORS } from "./types";

interface BudgetChartsProps {
  expenses: ExpenseCategory[];
  budgetHistory: BudgetData[];
}

export const BudgetCharts = ({ expenses, budgetHistory }: BudgetChartsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="p-4 bg-white/90">
        <h4 className="text-lg font-medium text-sage-500 mb-4">
          Expense Breakdown
        </h4>
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
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
                dataKey={(data) =>
                  data.expenses.reduce((sum, exp) => sum + exp.amount, 0)
                }
                name="Total Expenses"
                fill="#FF7F5C"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};