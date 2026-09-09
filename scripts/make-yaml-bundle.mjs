/**
 * 生成 scripts/yaml-bundle.js（esbuild IIFE，globalName=YamlLib）。
 * 由 build-client.mjs 内联进 client bundle。运行：node scripts/make-yaml-bundle.mjs
 */
import esbuild from 'esbuild'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const r = esbuild.buildSync({
  stdin: { contents: 'module.exports = require("yaml");', resolveDir: here },
  bundle: true,
  format: 'iife',
  globalName: 'YamlLib',
  write: false,
  define: { 'process.env.NODE_ENV': '"production"' },
  minify: true,
})
writeFileSync(join(here, 'yaml-bundle.js'), r.outputFiles[0].text)
console.log('yaml-bundle.js:', r.outputFiles[0].text.length, 'bytes')
