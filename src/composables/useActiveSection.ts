import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/**
 * Id of the section crossing the middle band of the viewport.
 * Returns 'top' on the server and until the observer reports.
 */
export function useActiveSection(ids: string[]): Ref<string> {
  const active = ref('top')
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!('IntersectionObserver' in window)) return
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) active.value = entry.target.id
      },
      // A thin band just above the middle of the viewport.
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => observer?.disconnect())
  return active
}
