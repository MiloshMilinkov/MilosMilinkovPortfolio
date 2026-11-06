import { describe, expect, it } from 'vitest'
import { buildSchematic } from '../../src/lib/schematic'

describe('buildSchematic', () => {
  it('is deterministic for a seed (server render and hydration must match)', () => {
    expect(buildSchematic('projectanvil')).toEqual(buildSchematic('projectanvil'))
  })

  it('draws different art for different seeds', () => {
    expect(buildSchematic('blog-app').traces).not.toEqual(buildSchematic('job-board').traces)
  })

  it('keeps every node and chip inside the 640×400 canvas', () => {
    for (const seed of ['euronet', 'silicon-lottery', 'spendsmart', 'recipe-sharing']) {
      const art = buildSchematic(seed)
      expect(art.traces.length).toBeGreaterThan(0)
      for (const n of art.nodes) {
        expect(n.x).toBeGreaterThanOrEqual(0)
        expect(n.x).toBeLessThanOrEqual(640)
        expect(n.y).toBeGreaterThanOrEqual(0)
        expect(n.y).toBeLessThanOrEqual(400)
      }
      for (const c of art.chips) {
        expect(c.x + c.w).toBeLessThanOrEqual(640)
        expect(c.y + c.h).toBeLessThanOrEqual(400)
      }
    }
  })
})
