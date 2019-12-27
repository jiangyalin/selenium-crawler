const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')

const config = {
  path: path.normalize(__dirname + '/book/')
}

const readFileList = (dir, filesList = []) => {
  const files = fs.readdirSync(dir)
  files.forEach(item => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList) // 递归读取
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

const getProjectAll = () => {
  return fs.readdirSync(config.path).filter(item => fs.statSync(path.join(config.path, item)).isDirectory()).map(item => {
    return {
      path: config.path + item,
      name: item
    }
  })
}

const zip = () => {
  getProjectAll().filter(item => item.path.indexOf('book-zip') === -1).forEach(node => {
    const zip = new JSZip()
    const filesList = readFileList(node.path)

    filesList.forEach(item => {
      const _path = item.fullPath.substring(item.fullPath.indexOf(node.path) + node.path.length)
      zip.file(_path, fs.readFileSync(item.fullPath, { encoding: 'utf-8' }))
    })

    zip.generateNodeStream({
      type: 'nodebuffer',
      streamFiles: true
    }).pipe(fs.createWriteStream('./book/book-zip/' + node.name + '.zip')).on('finish', () => {
      console.log(node.name + '.zip')
    })
  })
}

module.exports = zip

// 获取所有文件夹
// console.log('fs.readdirSync(dir)', zip())

