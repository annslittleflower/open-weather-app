import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inp: ClassValue[]) {
  return twMerge(clsx(inp));
}

export default cn;
