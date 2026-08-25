import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(price: number): string {
  return '₹' + price.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}
