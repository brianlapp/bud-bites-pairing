import { UserStats } from "@/types/profile";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}

export interface GameStatsSectionProps {
  stats: UserStats | null;
}

export interface GameStatsGroupProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  stats: StatCardProps[];
}