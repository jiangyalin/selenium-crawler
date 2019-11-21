const fs = require('fs')
const jsDom = require('jsdom').JSDOM
const jquery = require('jquery')

const html = fs.readFileSync('./index.html', 'utf8')
const $ = jquery(new jsDom(html).window)
const length = $('.main-content [log-set-param="table_view"]').length

const trim = str => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

const list = []
for (let i = 0; i < length - 1; i++) {
  const table = $('.main-content [log-set-param="table_view"]').eq(i)
  const tableLength = table.find('tr').length
  for (let j = 1; j < tableLength; j ++) {
    const date = trim(table.find('tr').eq(j).find('td').eq(0).text())
    let obj = {
      year: date.substring(0, date.indexOf('年')),
      month: date.substring(date.indexOf('年') + 1, date.indexOf('月')),
      day: date.substring(date.indexOf('月') + 1, date.indexOf('日')),
      date,
      name: trim(table.find('tr').eq(j).find('td').eq(1).text()),
      size: table.find('tr').eq(j).find('td').eq(2).text(),
      type: trim(table.find('tr').eq(0).find('td').eq(1).text())
    }
    list.push(obj)
  }
}
// console.log('list', list)
// console.log('table', $('.main-content [log-set-param="table_view"]').eq(6).html())
