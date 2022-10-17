import { readFile, stat } from 'fs/promises'

const __dirname = new URL('.', import.meta.url).pathname

const pkg = JSON.parse(await readFile(`${__dirname}/../package.json`))

const files = [pkg.main, pkg.module, pkg.types]

const fileStats = await Promise.all(files.map(async (file) => {
  try {
    await stat(`${__dirname}/../${file}`)
    return true  
  } catch (e) {
    console.warn(`file(${file}) not found`)
    return false
  }
}))

if (fileStats.some((file) => !file)) {
  console.error('Build failed')
  process.exit(1)
}

console.log('Build succeeded')
