/**
 * Warp-tunnel starfield: stars fly toward the viewer from a vanishing point and
 * are drawn as streaks. Pure drawing logic — the component owns the canvas,
 * the animation loop, pointer and scroll input.
 */
export interface Star {
  x: number
  y: number
  z: number
  /** 0 bone, 1 steel, 2 brass, 3 ember */
  tone: number
}

const TONES = ['230 225 214', '138 143 152', '200 163 90', '255 90 60']

export function createStars(count: number, random: () => number = Math.random): Star[] {
  return Array.from({ length: count }, () => spawn(random, random()))
}

function spawn(random: () => number, z = 1): Star {
  const r = random()
  return {
    x: (random() * 2 - 1) * 1.2,
    y: (random() * 2 - 1) * 1.2,
    // Kept clear of the respawn threshold so a frame with advance 0 changes nothing.
    z: Math.max(0.05, z),
    tone: r < 0.62 ? 0 : r < 0.86 ? 1 : r < 0.97 ? 2 : 3,
  }
}

export interface FrameInput {
  width: number
  height: number
  /** Vanishing point in CSS pixels. */
  cx: number
  cy: number
  /** Depth travelled this frame (0 = frozen). */
  advance: number
  /** Streak length factor (larger while scrolling). */
  stretch: number
}

/** Advances the stars by `advance` and draws one frame. */
export function drawFrame(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  f: FrameInput,
  random: () => number = Math.random,
): void {
  ctx.clearRect(0, 0, f.width, f.height)
  const scale = Math.max(f.width, f.height) * 0.42
  ctx.lineCap = 'round'

  for (let i = 0; i < stars.length; i++) {
    let s = stars[i]!
    s.z -= f.advance
    if (s.z <= 0.02) {
      s = stars[i] = spawn(random)
    }
    const px = f.cx + (s.x / s.z) * scale
    const py = f.cy + (s.y / s.z) * scale
    if (px < -50 || px > f.width + 50 || py < -50 || py > f.height + 50) {
      // Recycle off-canvas stars only while moving, so a still frame never changes.
      if (f.advance > 0) stars[i] = spawn(random)
      continue
    }
    const tailZ = Math.min(1.2, s.z + 0.03 + f.stretch * 0.06)
    const tx = f.cx + (s.x / tailZ) * scale
    const ty = f.cy + (s.y / tailZ) * scale
    const depth = 1 - s.z
    const alpha = Math.min(1, 0.18 + depth * depth * 1.1)
    ctx.strokeStyle = `rgb(${TONES[s.tone]} / ${alpha.toFixed(3)})`
    ctx.lineWidth = 0.6 + depth * 2.2
    ctx.beginPath()
    ctx.moveTo(tx, ty)
    ctx.lineTo(px, py)
    ctx.stroke()
  }
}
