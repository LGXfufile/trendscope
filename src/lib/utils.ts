import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getGradientForValue(value: number, max: number): string {
  const percentage = (value / max) * 100;
  if (percentage >= 80) return 'from-emerald-500 to-teal-400';
  if (percentage >= 60) return 'from-blue-500 to-cyan-400';
  if (percentage >= 40) return 'from-violet-500 to-purple-400';
  if (percentage >= 20) return 'from-orange-500 to-yellow-400';
  return 'from-gray-500 to-gray-400';
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20';
    case 'Medium': return 'text-amber-500 bg-amber-50 dark:bg-amber-950/20';
    case 'Hard': return 'text-red-500 bg-red-50 dark:bg-red-950/20';
    default: return 'text-gray-500 bg-gray-50 dark:bg-gray-950/20';
  }
}