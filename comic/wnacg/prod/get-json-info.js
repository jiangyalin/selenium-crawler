const fs = require('fs')
const moment = require('moment')

// const updatedList = fs.readFileSync('./data/2019-11-29.json', 'utf8')

for (let i = 0; i < 5000; i ++) {
  const path = './data/' + moment().add(-i, 'days').format('YYYY-MM-DD') + '.json'
  let list = {
    node: []
  }
  if (fs.existsSync(path)) list = JSON.parse(fs.readFileSync(path, 'utf8'))
  if (list.node.length > 1) console.log('aaa')
}

// const node = JSON.parse(updatedList).node

// console.log('node', node.length)
