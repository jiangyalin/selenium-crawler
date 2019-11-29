const fs = require('fs')

const updatedList = fs.readFileSync('./list.json', 'utf8')

const node = JSON.parse(updatedList).node

console.log('node', node.length)
