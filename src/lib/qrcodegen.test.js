import qrcodegen from './qrcodegen'

test('gera um QR code para uma URL', () => {
  const qr = qrcodegen.QrCode.encodeText('https://exemplo.vercel.app', qrcodegen.QrCode.Ecc.MEDIUM)
  expect(qr.size).toBeGreaterThanOrEqual(21)
  // Os três quadrados de posição ficam escuros nos cantos
  expect(qr.getModule(0, 0)).toBe(true)
  expect(qr.getModule(qr.size - 1, 0)).toBe(true)
  expect(qr.getModule(0, qr.size - 1)).toBe(true)
})
