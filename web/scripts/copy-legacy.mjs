// Copia la web antigua (torneo.html y sus carpetas) y las imágenes propias de la web
// nueva (static/) a public/, para que Vite las sirva tal cual. public/ no va a git.
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const web = join(dirname(fileURLToPath(import.meta.url)), '..')
const root = join(web, '..')
const pub = join(web, 'public')

rmSync(pub, { recursive: true, force: true })
mkdirSync(pub)

for (const item of ['torneo.html', 'css', 'js', 'assets', 'img']) {
  const from = join(root, item)
  if (existsSync(from)) cpSync(from, join(pub, item), { recursive: true })
}
cpSync(join(web, 'static'), pub, { recursive: true })

console.log('copy-legacy: torneo.html y recursos copiados a public/')
