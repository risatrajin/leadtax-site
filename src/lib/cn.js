import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn/ui class helper: joins classes and lets later Tailwind classes override earlier ones. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
