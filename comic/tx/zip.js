const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')

const readFileList = (dir, filesList = []) => {
  const files = fs.readdirSync(dir)
  files.forEach(item => {
    console.log('item', item)
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList) // 递归读取文件
    } else {
      filesList.push({
        fullPath,
        name: item,
        path: ''
      })
    }
  })
  return filesList
}

const zip = new JSZip()

const filesList = readFileList(__dirname + '/file/test/')

console.log('filesList', filesList)

filesList.forEach(item => {
  // const _path = item.fullPath.substring(item.fullPath.indexOf(info.title) + info.title.length + 1)
  // console.log('_path', _path)
  zip.file('OPS/chapter2.html', fs.readFileSync(item.fullPath, { encoding: 'utf-8' }))
})

zip.generateNodeStream({
  type: 'nodebuffer',
  streamFiles: true
}).pipe(fs.createWriteStream('out.zip')).on('finish', () => {
  console.log("out.zip written.")
})