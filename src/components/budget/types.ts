export interface ExpenseCategory {
  name: string;
  amount: number;
}

export interface BudgetData {
  income: number;
  expenses: ExpenseCategory[];
  month: string;
}

export const COLORS = ["#2D4739", "#7d9186", "#a3b3aa", "#FF7F5C"];

export const EXPENSE_CATEGORIES = [
  "Flower",
  "Edibles",
  "Concentrates",
  "Accessories",
];