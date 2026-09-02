/**
 * Dev-only mock data — used when there is no D1 binding configured (e.g. running
 * `pnpm dev` locally before any D1 is provisioned). Imported lazily by
 * `store.ts` so the production bundle is unaffected.
 *
 * Generate fresh `time` / `ping` hex strings on import to keep the chart and
 * detail bar looking like real recent data.
 */
import type { MonitorStateCompacted } from '../../types/config'

function makeLatencyHex() {
  // 90 data points spanning the last ~24h (every ~16 minutes)
  const points = 90
  const now = Math.floor(Date.now() / 1000)
  const timeArr = new Uint32Array(points)
  const pingArr = new Uint16Array(points)
  for (let i = 0; i < points; i++) {
    timeArr[i] = now - (points - 1 - i) * 16 * 60
    // pseudo-random latency around 40-180ms with one spike and one dip
    const base = 60 + Math.sin(i / 6) * 30
    const noise = (i * 1103515245 + 12345) % 60
    let ping = Math.max(15, Math.round(base + (noise % 40) - 20))
    if (i === 42) ping = 380 // one outlier
    if (i === 11) ping = 18 // one fast response
    pingArr[i] = ping
  }
  const timeHex = Array.from(new Uint8Array(timeArr.buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  const pingHex = Array.from(new Uint8Array(pingArr.buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return { time: timeHex, ping: pingHex, loc: { c: [points], v: ['HKG'] } }
}

const now = Math.floor(Date.now() / 1000)
const dayAgo = now - 86400 * 30

const mock: MonitorStateCompacted = {
  lastUpdate: now,
  overallUp: 4,
  overallDown: 0,
  incident: {
    blog: {
      start: [dayAgo, dayAgo + 86400 * 5, dayAgo + 86400 * 12],
      end: [dayAgo + 3600, dayAgo + 86400 * 5 + 3600, dayAgo + 86400 * 12 + 7200],
      error: [
        ['Database connection timeout'],
        ['Scheduled maintenance window'],
        ['Edge cache invalidation'],
      ],
    },
    sink: {
      start: [dayAgo],
      end: [null],
      error: [['Connection refused (HTTP 502)']],
    },
    comment: {
      start: [dayAgo],
      end: [dayAgo + 1800],
      error: [['Upstream timeout']],
    },
    r2: {
      start: [dayAgo],
      end: [dayAgo + 60],
      error: [['Edge cold start']],
    },
  },
  latency: {
    blog: makeLatencyHex(),
    sink: makeLatencyHex(),
    comment: makeLatencyHex(),
    r2: makeLatencyHex(),
  },
}

export const DEV_MOCK_STATE = JSON.stringify(mock)
