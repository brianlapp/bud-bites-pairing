import { StatCardProps } from "../types/stats";

export const StatCard = ({ title, value, icon: Icon }: StatCardProps) => (
  <div className="flex items-center space-x-3 p-4 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors">
    <div className="bg-sage-100 p-2 rounded-full">
      <Icon className="h-6 w-6 text-sage-500" />
    </div>
    <div>
      <p className="text-sm text-sage-400">{title}</p>
      <p className="text-xl font-semibold text-sage-600">{value}</p>
    </div>
  </div>
);