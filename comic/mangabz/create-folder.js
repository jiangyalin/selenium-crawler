// 创建任意层级文件夹
const fs = require('fs')

const createFolder = path => {
  const arr = path.substring(path.indexOf('/') + 1).split('/')
  const isAbsolutePath = path.substring(0, 1) !== '.'
  let _path = isAbsolutePath ? '' : '.'
  arr.forEach(item => {
    _path += '/' + item
    if (!fs.existsSync(_path)) fs.mkdirSync(_path)
  })
}

module.exports = createFolder
