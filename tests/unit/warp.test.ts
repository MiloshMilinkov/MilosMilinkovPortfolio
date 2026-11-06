import { describe, expect, it } from 'vitest'
import { createStars, drawFrame } from '../../src/lib/warp'
import { seededRandom } from '../../src/lib/schematic'

/** Records the canvas calls drawFrame makes. */
function recorder() {
  const lines: number[][] = []
  let from: number[] = []
  const ctx = {
    clearRect: () => {},
    beginPath: () => {},
    moveTo: (x: number, y: number) => (from = [x, y]),
    lineTo: (x: number, y: number) => lines.push([...from, x, y]),
    stroke: () => {},
    set strokeStyle(_: string) {},
    set lineWidth(_: number) {},
    set lineCap(_: string) {},
  }
  return { ctx: ctx as unknown as CanvasRenderingContext2D, lines }
}

const frame = { width: 800, height: 600, cx: 400, cy: 300, advance: 0, stretch: 0 }

describe('warp starfield', () => {
  it('creates the requested number of stars inside the depth range', () => {
    const stars = createStars(200, seededRandom('a'))
    expect(stars).toHaveLength(200)
    for (const s of stars) {
      expect(s.z).toBeGreaterThan(0)
      expect(s.z).toBeLessThanOrEqual(1)
      expect([0, 1, 2, 3]).toContain(s.tone)
    }
  })

  it('draws one streak per visible star, pointing away from the vanishing point', () => {
    const stars = createStars(50, seededRandom('b'))
    const { ctx, lines } = recorder()
    drawFrame(ctx, stars, frame, seededRandom('c'))
    expect(lines.length).toBeGreaterThan(0)
    expect(lines.length).toBeLessThanOrEqual(50)
    for (const [tx, ty, px, py] of lines) {
      // The head is never closer to the vanishing point than the tail.
      expect(Math.hypot(px! - 400, py! - 300)).toBeGreaterThanOrEqual(Math.hypot(tx! - 400, ty! - 300) - 1e-9)
    }
  })

  it('moves stars toward the viewer and respawns the ones that pass it', () => {
    const stars = createStars(30, seededRandom('d'))
    const before = stars.map((s) => s.z)
    drawFrame(recorder().ctx, stars, { ...frame, advance: 0.01 }, seededRandom('e'))
    const moved = stars.filter((s, i) => Math.abs(s.z - (before[i]! - 0.01)) < 1e-9).length
    expect(moved).toBeGreaterThan(0)

    drawFrame(recorder().ctx, stars, { ...frame, advance: 5 }, seededRandom('f'))
    for (const s of stars) expect(s.z).toBeGreaterThan(0.02)
  })

  it('draws the same picture again when advance is 0 (reduced-motion still frame)', () => {
    const stars = createStars(80, seededRandom('g'))
    const random = seededRandom('h')
    // The first frame may respawn stars that project off-canvas; after that it is stable.
    drawFrame(recorder().ctx, stars, frame, random)
    const a = recorder()
    drawFrame(a.ctx, stars, frame, random)
    const b = recorder()
    drawFrame(b.ctx, stars, frame, random)
    expect(b.lines).toEqual(a.lines)
    expect(a.lines.length).toBeGreaterThan(0)
  })
})
