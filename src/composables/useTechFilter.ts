import { readonly, ref, type Ref } from 'vue'

// Module-level state shared by the Skills and Projects sections. The site is
// prerendered once at build time, so there is no cross-request state to leak.
const active = ref<string | null>(null)

export function useTechFilter(): { active: Readonly<Ref<string | null>>; setFilter: (id: string | null) => void } {
  return {
    active: readonly(active),
    setFilter: (id) => {
      active.value = id
    },
  }
}
