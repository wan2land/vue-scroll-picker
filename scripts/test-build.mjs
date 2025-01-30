/* eslint-disable no-console */

import { readFile, stat } from 'fs/promises'

const __dirname = new URL('.', import.meta.url).pathname

const pkg = JSON.parse(await readFile(`${__dirname}/../package.json`))

const files = [pkg.main, pkg.module, pkg.types, pkg.typings, pkg.exports]

const wrongFiles = []
async function traverse(obj) {
  if (Array.isArray(obj)) {
    return Promise.all(obj.map((item) => traverse(item)))
  }

  if (typeof obj === 'object' && obj !== null) {
    return Promise.all(Object.values(obj).map((item) => traverse(item)))
  }

  if (typeof obj === 'string') {
    console.log('check', obj)
    try {
      await stat(`${__dirname}/../${obj}`)
    } catch {
      console.warn(`file(${file}) not found`)
      wrongFiles.push(file)
    }
  }
}

traverse(files).then(() => {
  if (wrongFiles.length > 0) {
    console.error('Build failed')
    process.exit(1)
  }

  console.log('Build succeeded')
})
