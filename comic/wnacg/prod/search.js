const fs = require('fs')
const moment = require('moment')

// condition 筛选结构， showImg
const search = (condition = [], showImg = false) => {
  const node = []
  for (let i = 0; i < 5000; i ++) {
    const path = './data/' + moment().add(-i, 'days').format('YYYY-MM-DD') + '.json'
    let list = { node: [] }
    if (fs.existsSync(path)) list = JSON.parse(fs.readFileSync(path, 'utf8'))
    node.push(...list.node.filter(item => {
      return condition.filter(node => item.title.indexOf(node) === -1).length === 0
    }).map(item => {
      return {
        ...item,
        node: null
      }
    }))
    fs.writeFileSync('./data/search.json', JSON.stringify({ tips: '', bookName: '', node }))
  }

  return node
}

console.log('search([\'Hamao\'])', search(['Hamao'])[0])