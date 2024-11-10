import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toCST = (date: Date): Date => {
  // Calculate the CST offset
  const CST_OFFSET = +6
  const offsetInMs = CST_OFFSET * 60 * 60 * 1000
  return new Date(date.getTime() + offsetInMs)
}
