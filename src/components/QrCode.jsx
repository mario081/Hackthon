import { useMemo } from 'react'
import qrcodegen from '../lib/qrcodegen'

const QUIET = 2

export default function QrCode({ value, label, className = '' }) {
  const { size, path } = useMemo(() => {
    const qr = qrcodegen.QrCode.encodeText(value, qrcodegen.QrCode.Ecc.MEDIUM)
    let d = ''
    for (let y = 0; y < qr.size; y++) {
      for (let x = 0; x < qr.size; x++) {
        if (qr.getModule(x, y)) d += `M${x + QUIET},${y + QUIET}h1v1h-1z`
      }
    }
    return { size: qr.size + QUIET * 2, path: d }
  }, [value])

  return (
    <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label} className={className} shapeRendering="crispEdges">
      <rect width={size} height={size} fill="#fff" />
      <path d={path} fill="#030b1f" />
    </svg>
  )
}
