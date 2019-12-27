// 清洗数据
const fs = require('fs')
const moment = require('moment')

for (let i = 0; i < 5000; i ++) {
  const path = './data/' + moment().add(-i, 'days').format('YYYY-MM-DD') + '.json'
  if (fs.existsSync(path)) {
    let list = JSON.parse(fs.readFileSync(path, 'utf8'))
    list.node = list.node.map(item => {
      return {
        ...item,
        isStorage: false,
        localName: '',
        isDown: false,
        isOriginalIme: false
      }
    })
    fs.writeFileSync(path, JSON.stringify(list))
  }
}