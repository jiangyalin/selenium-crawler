const fs = require('fs')
let path = __dirname + './../../comic/wnacg/prod/data/search.json'

module.exports = {
  get: (id, date = null) => {
    if (date) {
      path = __dirname + './../../comic/wnacg/prod/data/' + date + '.json'
      if (fs.existsSync(path)) {
        let node = JSON.parse(fs.readFileSync(path, 'utf8')).node
        node = node.find(item => item.id === id)
        return node
      }
    }
  },
  getAll: () => {
    return JSON.parse(fs.readFileSync(path, 'utf8')).node
  },
  set: node => {
    if (fs.existsSync(path)) {
      let list = JSON.parse(fs.readFileSync(path, 'utf8'))
      list.node = node
      fs.writeFileSync(path, JSON.stringify(list))
    }
  }
}