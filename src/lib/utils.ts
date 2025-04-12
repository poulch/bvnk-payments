import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWalletAddress(address: string) {
  if (address.length <= 10) return address;
  return `${address.slice(0, 7)}...${address.slice(-5)}`;
}
