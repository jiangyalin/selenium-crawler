const fs = require('fs')
const jsDom = require('jsdom').JSDOM
const jquery = require('jquery')
const cnchar = require('cnchar')
const trad = require('cnchar-trad')
const createXLsx = require('./create-xlsx')

cnchar.use(trad)

function ObjClass({ year, month, date, name, formerName, type, company, size }) {
  this.year = year || ''
  this.month = month || ''
  this.date = date || '' // 开始-结束
  this.name = name || '' // 名
  this.formerName = formerName || '' // 原名
  this.type = type // 种类
  this.company = company || '' // 公司
  this.size = size || '' // size
}

const newFanChronologyAnalysis = () => {
  const trim = str => str.replace(/(^\s*)|(\s*$)/g, '')

  const list = []
  for (let k = 2000; k <= 2020; k++) {
    const html = fs.readFileSync('./html/index_' + k + '.html', 'utf8')
    const $ = jquery(new jsDom(html).window)
    const length = $('#bodyContent .wikitable').length

    for (let i = 0; i < length - 1; i++) {
      const table = $('#bodyContent .wikitable').eq(i)
      const tableLength = table.find('tr').length
      for (let j = 1; j < tableLength; j ++) {
        const date = trim(table.find('tr').eq(j).find('td').eq(0).text())
        let obj = {
          year: k,
          month: date.substring(0, date.indexOf('月')),
          date,
          name: cnchar.convert.tradToSimple(trim(table.find('tr').eq(j).find('td').eq(1).text())),
          formerName: table.find('tr').eq(j).find('td').eq(2).text(),
          type: $('#bodyContent h2').eq(i - 4).find('.mw-headline').text(), // mw-headline
          company: trim(table.find('tr').eq(j).find('td').eq(3).text()),
          size: trim(table.find('tr').eq(j).find('td').eq(4).text())
        }
        list.push(new ObjClass(obj))
      }
    }
  }
  console.log('list', list)
  return list
}

// module.exports = newFanChronologyAnalysis()

console.log('newFanChronologyAnalysis', createXLsx(newFanChronologyAnalysis()))