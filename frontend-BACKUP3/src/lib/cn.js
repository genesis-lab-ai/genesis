/** Minimal className combiner — avoids pulling in clsx/tailwind-merge for a small project. */
export function cn(...args) {
  return args.filter(Boolean).join(" ");
}
