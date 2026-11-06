/** Deterministic pseudo-random generator (mulberry32) seeded from a string (FNV-1a). */
export function seededRandom(seed: string): () => number {
  let h = 0x811c9dc5
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  let a = h >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export interface Schematic {
  traces: string[]
  nodes: { x: number; y: number; r: number }[]
  chips: { x: number; y: number; w: number; h: number }[]
}

/**
 * Circuit-trace artwork for projects without a screenshot. Same seed → same
 * drawing, so the server render and hydration always match.
 */
export function buildSchematic(seed: string, width = 640, height = 400, cell = 40): Schematic {
  const rnd = seededRandom(seed)
  const cols = Math.floor(width / cell)
  const rows = Math.floor(height / cell)
  const pick = (n: number) => Math.floor(rnd() * n)

  const chips = Array.from({ length: 2 + pick(2) }, () => {
    const w = (2 + pick(3)) * cell
    const h = (1 + pick(2)) * cell
    return { x: (1 + pick(cols - 5)) * cell, y: (1 + pick(rows - 3)) * cell, w, h }
  })

  const traces: string[] = []
  const nodes: Schematic['nodes'] = []
  for (let i = 0; i < 7; i++) {
    let x = pick(cols + 1) * cell
    let y = pick(rows + 1) * cell
    const points = [`${x},${y}`]
    nodes.push({ x, y, r: 3 })
    for (let step = 0; step < 4 + pick(4); step++) {
      const len = (1 + pick(3)) * cell
      const dir = pick(4)
      if (dir === 0) x = Math.min(width, x + len)
      else if (dir === 1) x = Math.max(0, x - len)
      else if (dir === 2) y = Math.min(height, y + len)
      else {
        // 45° jog keeps the drawing from looking like a plain grid.
        x = Math.min(width, x + cell)
        y = Math.max(0, y - cell)
      }
      points.push(`${x},${y}`)
    }
    nodes.push({ x, y, r: 4.5 })
    traces.push(points.join(' '))
  }
  return { traces, nodes, chips }
}
