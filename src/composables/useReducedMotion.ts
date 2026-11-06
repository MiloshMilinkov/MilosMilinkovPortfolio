import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/** True when the visitor asks for reduced motion. False on the server. */
export function useReducedMotion(): Ref<boolean> {
  const reduced = ref(false)
  let query: MediaQueryList | undefined
  const update = () => {
    reduced.value = !!query?.matches
  }

  onMounted(() => {
    query = window.matchMedia('(prefers-reduced-motion: reduce)')
    update()
    query.addEventListener('change', update)
  })
  onBeforeUnmount(() => query?.removeEventListener('change', update))

  return reduced
}

/** Synchronous check for code that runs only in the browser (e.g. inside onMounted). */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
