const fs = require('fs')
let path = __dirname + './../../comic/wnacg/prod/data/search.json'

module.exports = {
  get: (id, date = null) => { // 获取指定book
    if (!date) return false
    path = __dirname + './../../comic/wnacg/prod/data/' + date + '.json'
    if (!fs.existsSync(path))  return false
    const node = JSON.parse(fs.readFileSync(path, 'utf8')).node
    return node.find(item => item.id === id)
  },
  getAll: () => { // 获取全部book
    return JSON.parse(fs.readFileSync(path, 'utf8')).node
  },
  setAll: node => { // 全量覆盖
    if (fs.existsSync(path)) {
      let list = JSON.parse(fs.readFileSync(path, 'utf8'))
      list.node = node
      fs.writeFileSync(path, JSON.stringify(list))
    }
  },
  set: (id, date = null, obj = {}) => { // 对日期文件修改单个信息
    if (!date) return false
    path = __dirname + './../../comic/wnacg/prod/data/' + date + '.json'
    if (!fs.existsSync(path))  return false
    const json = JSON.parse(fs.readFileSync(path, 'utf8'))
    let _json = json
    _json.node = json.node.map(item => {
      if (id !== item.id) return item
      return {
        ...item,
        ...obj
      }
    })
    fs.writeFileSync(path, JSON.stringify(_json))
  }
}