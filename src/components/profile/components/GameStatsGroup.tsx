import { GameStatsGroupProps } from "../types/stats";
import { StatCard } from "./StatCard";

export const GameStatsGroup = ({ title, icon: Icon, stats }: GameStatsGroupProps) => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <Icon className="h-5 w-5 text-sage-500" />
      <h3 className="text-xl font-semibold text-sage-500">{title}</h3>
    </div>
    <div className="grid gap-4">
      {stats.map((stat, index) => (
        <StatCard key={`${title}-${index}`} {...stat} />
      ))}
    </div>
  </div>
);