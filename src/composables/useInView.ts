import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/** True while (or, with `once`, after) the element is in the viewport. False on the server. */
export function useInView(
  target: Ref<Element | null>,
  { once = true, rootMargin = '0px 0px -15% 0px' }: { once?: boolean; rootMargin?: string } = {},
): Ref<boolean> {
  const inView = ref(false)
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!target.value) return
    if (!('IntersectionObserver' in window)) {
      inView.value = true
      return
    }
    observer = new IntersectionObserver(
      ([entry]) => {
        inView.value = !!entry?.isIntersecting
        if (inView.value && once) observer?.disconnect()
      },
      { rootMargin },
    )
    observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())
  return inView
}
