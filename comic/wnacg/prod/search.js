const fs = require('fs')
const moment = require('moment')

// condition 筛选结构， showImg 是否包含图片,  isRedundancy 是否冗余（默认必须全量匹配）
const search = (condition = [], showImg = false, isRedundancy = false) => {
  const node = []
  let max = 0
  for (let i = 0; i < 5000; i ++) {
    const path = './data/' + moment().add(-i, 'days').format('YYYY-MM-DD') + '.json'
    let list = { node: [] }
    if (fs.existsSync(path)) list = JSON.parse(fs.readFileSync(path, 'utf8'))
    node.push(...list.node.filter(item => {
      if (!isRedundancy) return condition.filter(node => item.title.indexOf(node) === -1).length === 0
      if (isRedundancy) return condition.filter(node => item.title.indexOf(node) !== -1).length !== 0
    }).map(item => {
      max += item.node.length
      return {
        ...item,
        node: showImg ? item.node : null
      }
    }))
    console.log('max', max)
    fs.writeFileSync('./data/search.json', JSON.stringify({ tips: '', bookName: '', node }))
  }

  return node
}

console.log('search([\'Hamao\'])', search(['無邪気']).length)