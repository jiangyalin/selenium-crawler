const fs = require('fs')
const jsDom = require('jsdom').JSDOM
const jquery = require('jquery')

const html = fs.readFileSync('./html/index_' + 2021 + '.html', 'utf8')
const $ = jquery(new jsDom(html).window)

const i = 6
const j = 2

const table = $('#bodyContent .wikitable').eq(i)
// const name = table.find('tr').eq(j).find('td').eq(2).text()
// const type = table.prev().find('.mw-headline').text()
//
// console.log('table', table)
// console.log('name', name)
// console.log('type', type)

// html转二维数组
const jQueryToArr = table => {
  const arr = []
  for (let i = 1; i < table.find('tr').length; i++) {
    const tr = table.find('tr').eq(i)
    arr.push([])
    for (let j = 0; j < tr.find('td').length; j++) {
      const td = tr.find('td').eq(j)
      arr[i - 1].push({
        rowspan: Number(td.attr('rowspan') || 1),
        colspan: Number(td.attr('colspan') || 1),
        text: td.text()
      })
    }
  }
  return arr
}

// 表格数据格式化（过滤异常数据，填补跨行跨列）
const tableDataFormat = arrData => {
  const _arrData = arrData.filter(item => item.length > 1)
  return _arrData.map((item, i) => {
    return item.map((node, j) => {
      if (node.rowspan > 1) {
        for (let k = 1; k < node.rowspan; k++) {
          _arrData[i + k].splice(j, 0, {
            ...node,
            rowspan: 1
          })
        }
      }
      return node
    })
  })
}

const tableDataSimplify = tableData => tableData.map(item => item.map(node => node.text))

const trim = str => str.replace(/(^\s*)|(\s*$)/g, '')

const table1 = jQueryToArr(table)
console.log('table1', table1[63])
const table2 = tableDataFormat(table1)
console.log('table2', table2[63])

const tableData = tableDataSimplify(table2)
console.log('tableData', tableData[63])
const rowData = tableData[63]

const date = trim(rowData[0] || '')
let obj = {
  year: 2021,
  month: date.substring(0, date.indexOf('月')),
  date,
  // name: cnchar.convert.tradToSimple(trim(rowData[1] || '')),
  formerName: rowData[2] || '',
  // type: tableDom.prev().find('.mw-headline').text(), // mw-headline
  company: trim(rowData[3] || ''),
  size: trim(rowData[4] || '')
}

console.log('jQueryToArr', obj)
