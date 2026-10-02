import { afterEach, vi } from 'vitest'
import { checkCredentials, isAuthConfigured, sha256Hex } from './auth'

afterEach(() => vi.unstubAllEnvs())

test('sha256Hex gera o hash hexadecimal', async () => {
  expect(await sha256Hex('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
})

test('sem configuração o login fica desativado', async () => {
  vi.stubEnv('VITE_ADMIN_USER', '')
  vi.stubEnv('VITE_ADMIN_PASSWORD_SHA256', '')
  expect(isAuthConfigured()).toBe(false)
  expect(await checkCredentials('admin', 'qualquer')).toBe(false)
})

test('aceita só o usuário e a senha certos', async () => {
  vi.stubEnv('VITE_ADMIN_USER', 'admin')
  vi.stubEnv('VITE_ADMIN_PASSWORD_SHA256', await sha256Hex('segredo-de-teste'))
  expect(isAuthConfigured()).toBe(true)
  expect(await checkCredentials('admin', 'segredo-de-teste')).toBe(true)
  expect(await checkCredentials(' Admin ', 'segredo-de-teste')).toBe(true)
  expect(await checkCredentials('admin', 'errada')).toBe(false)
  expect(await checkCredentials('outro', 'segredo-de-teste')).toBe(false)
})
