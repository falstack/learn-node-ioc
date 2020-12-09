import * as fs from 'fs'
import { join } from 'path'

export function getFiles(jsonPath: string = process.cwd(), ext = '') {
  const jsonFiles: Array<string> = []

  function findJsonFile(path: string) {
    if (
      /^\./.test(path) ||
      /\/\./.test(path) ||
      /\/node_modules\//.test(path)
    ) {
      return
    }

    const files = fs.readdirSync(path)

    files.forEach(function (item: string) {
      const fPath = join(path, item)
      const stat = fs.statSync(fPath)

      if (stat.isDirectory() === true) {
        findJsonFile(fPath)
      }

      if (stat.isFile() === true) {
        jsonFiles.push(fPath)
      }
    })
  }

  findJsonFile(jsonPath)

  if (ext) {
    return jsonFiles.filter((_) => _.endsWith(ext))
  }

  return jsonFiles
}
