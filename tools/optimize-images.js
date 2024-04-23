import fs from 'fs'
import { log } from 'console'
import path from 'path'
import sharp from 'sharp'

const input = path.resolve('./assets/image/original')
const output = path.resolve('./assets/image/optimized')

const convert = (file) => {
  const name = path.basename(file, path.extname(file))
  const original = sharp(file)
  original.metadata().then(({ width }) => {
    console.log(`\r\nConverting ${name}:`)

    console.log('- Original size in .avif format')
    original.clone().avif().toFile(`${output}/${name}.avif`).then(console.log)

    console.log('- Large size in .avif format')
    original
      .clone()
      .resize(Math.round((width / 4) * 3))
      .avif()
      .toFile(`${output}/${name}_large.avif`)
      .then(console.log)

    console.log('- Medium size in .avif format')
    original
      .clone()
      .resize(Math.round(width / 2))
      .avif()
      .toFile(`${output}/${name}_medium.avif`)
      .then(console.log)

    console.log('- Medium size in .jpg format')
    original
      .clone()
      .resize(Math.round(width / 2))
      .jpeg()
      .toFile(`${output}/${name}_medium.jpg`)
      .then(console.log)

    console.log('- Small size in .avif format')
    original
      .clone()
      .resize(Math.round(width / 4))
      .avif()
      .toFile(`${output}/${name}_small.avif`)
      .then(console.log)
  })
}

console.log(`Reading images from ${input}`)
fs.readdir(input, (error, files) => {
  if (error) throw error
  files.map((file) => {
    convert(`${input}/${file}`)
  })
})
