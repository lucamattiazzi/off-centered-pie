export interface Slice {
  center: number[]
  alpha: number
  beta: number
}

function sum(values: number[]): number {
  return values.reduce((a, v) => a + v, 0)
}

function computeArea (slice: Slice, radius: number): number {
  const angle = Math.abs(slice.beta - slice.alpha)
  const ax = slice.center[0]
  const ay = slice.center[1]
  const bx = radius * Math.cos(slice.alpha)
  const by = radius * Math.sin(slice.alpha)
  const cx = radius * Math.cos(slice.beta)
  const cy = radius * Math.sin(slice.beta)

  const sectorArea = angle * (radius ** 2) / 2
  const arcArea = sectorArea - (Math.sin(angle) * radius ** 2) / 2
  const triangleArea = (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)) / 2

  return arcArea + triangleArea
}

function getAngle (center: number[], radius: number, alpha: number, part: number): number {
  const expectedArea = part * Math.PI * radius ** 2
  let angle = part * Math.PI * 2
  let area = 0
  let iterations = 0
  let error = Infinity
  while (true) {
    const slice = {
      center,
      alpha,
      beta: alpha + angle
    }
    area = computeArea(slice, radius)
    error = Math.abs(expectedArea - area) / expectedArea
    if (error < 0.01 || iterations > 100) break
    const delta = area < expectedArea ? error / Math.PI : -error / Math.PI
    angle += delta
    iterations++
  }
  return angle
}

export function buildSlices (center: number[], radius: number, values: number[]): Slice[] {
  const normalized = values.map(v => v / sum(values))
  const slices = normalized.reduce<Slice[]>((acc, n, idx) => {
    const alpha = acc[idx - 1]?.beta ?? 0
    const angle = getAngle(center, radius, alpha, n)
    const beta = alpha + (idx === normalized.length - 1 ? 2 * Math.PI - alpha : angle)
    const slice = { alpha, beta, center }
    return [...acc, slice]
  }, [])
  return slices
}
