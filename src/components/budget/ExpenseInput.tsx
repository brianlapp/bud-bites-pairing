import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExpenseCategory } from "./types";

interface ExpenseInputProps {
  expense: ExpenseCategory;
  index: number;
  onChange: (index: number, value: string) => void;
}

export const ExpenseInput = ({ expense, index, onChange }: ExpenseInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={`expense-${index}`} className="text-sage-500">
        {expense.name}
      </Label>
      <Input
        id={`expense-${index}`}
        type="number"
        placeholder={`Enter ${expense.name.toLowerCase()} expenses`}
        value={expense.amount || ""}
        onChange={(e) => onChange(index, e.target.value)}
        className="border-sage-200 focus:border-coral-500 focus:ring-coral-500"
      />
    </div>
  );
};