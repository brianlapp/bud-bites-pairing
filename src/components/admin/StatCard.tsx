import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  color: string;
  iconColor: string;
}

export const StatCard = ({ title, value, icon: Icon, description, color, iconColor }: StatCardProps) => {
  return (
    <Card className={`${color} border-none shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#1a1a1a]">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[#1a1a1a] mb-1">
          {value.toLocaleString()}
        </div>
        <p className="text-xs text-[#8E9196]">{description}</p>
      </CardContent>
    </Card>
  );
};