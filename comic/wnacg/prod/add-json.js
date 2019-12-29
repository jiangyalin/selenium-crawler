const fs = require('fs')

const save = (time, node = [], name = '') => {
  const path = './data/' + time + '.json'
  let data = {}
  if (fs.existsSync(path)) data = JSON.parse(fs.readFileSync(path, 'utf8'))
  if (!data.node) {
    data = {
      tips: '章节',
      bookName: '',
      node: []
    }
  }

  if (data.node.find(item => item.title === name)) {
    data = {
      ...data,
      node: data.node.map(item => {
        if (item.title === name) return node
        return item
      })
    }
  } else {
    data.node.push(node)
  }

  fs.writeFileSync(path, JSON.stringify(data))
}

module.exports = save