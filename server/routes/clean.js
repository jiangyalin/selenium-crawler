const fs = require('fs')
const path = './data/all.json'

module.exports = {
  get: () => {
    if (fs.existsSync(path)) {
      return JSON.parse(fs.readFileSync(path, 'utf8')).node
    }
  },
  set: node => {
    if (fs.existsSync(path)) {
      let list = JSON.parse(fs.readFileSync(path, 'utf8'))
      list.node = node
      fs.writeFileSync(path, JSON.stringify(list))
    }
  }
}