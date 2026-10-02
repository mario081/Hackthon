// Define a senha do usuário admin do painel.
//   npm run senha -- MinhaSenhaForte   → usa a senha informada
//   npm run senha                      → gera uma senha aleatória
// Grava em .env.local (ignorado pelo git) apenas o hash SHA-256 da senha.
import { createHash, randomBytes } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const ENV_FILE = fileURLToPath(new URL('../.env.local', import.meta.url))
const given = process.argv[2]
const generated = !given

if (given && given.length < 8) {
  console.error('A senha precisa ter pelo menos 8 caracteres.')
  process.exit(1)
}

const password = given ?? randomBytes(9).toString('base64url')
const hash = createHash('sha256').update(password).digest('hex')

const kept = existsSync(ENV_FILE)
  ? readFileSync(ENV_FILE, 'utf8').split(/\r?\n/).filter((l) => l && !/^(VITE_ADMIN_|# Login do painel|# Senha gerada)/.test(l))
  : []

const lines = [
  ...kept,
  '# Login do painel (/painel/login) — usuário e hash SHA-256 da senha',
  ...(generated ? [`# Senha gerada: ${password}  (anote e apague esta linha)`] : []),
  'VITE_ADMIN_USER=admin',
  `VITE_ADMIN_PASSWORD_SHA256=${hash}`,
]
writeFileSync(ENV_FILE, lines.join('\n') + '\n')

console.log('Senha do admin atualizada em .env.local.')
if (generated) console.log('A senha gerada está anotada em .env.local.')
console.log('Reinicie o "npm run dev" para aplicar.')
