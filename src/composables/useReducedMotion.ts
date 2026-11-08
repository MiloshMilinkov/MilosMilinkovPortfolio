/** True when the visitor asks for reduced motion. Call only in the browser (e.g. inside onMounted). */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
