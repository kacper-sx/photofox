import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const qsAll = <T extends string>(selector: T) => {
  const els = document.querySelectorAll(selector)
  return Array.from(els).filter(el => el instanceof HTMLElement)
} 
