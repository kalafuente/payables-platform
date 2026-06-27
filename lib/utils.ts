/**
 * Joins class names, filtering out falsy values.
 * Sufficient for a controlled design system where class conflicts are avoided by construction.
 */
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}
