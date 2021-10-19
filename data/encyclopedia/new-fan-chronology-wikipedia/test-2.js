const fs = require('fs')
const jsDom = require('jsdom').JSDOM
const jquery = require('jquery')
const cnchar = require('cnchar')
const trad = require('cnchar-trad')

cnchar.use(trad)

const html = fs.readFileSync('./html/index_' + 2000 + '.html', 'utf8')
const $ = jquery(new jsDom(html).window)

const keyMap = {
  '开始日－结束日': 'startEndTime',
  '開始日－結束日': 'startEndTime',
  '開始日 - 結束日': 'startEndTime',
  作品名: 'name',
  中文譯名: 'name',
  原名: 'formerName',
  制作公司: 'company',
  製作公司: 'company',
  動畫製作: 'company',
  话数: 'size',
  話數: 'size',
  上映日: 'startDate',
  发售日期: 'startDate',
  發售日: 'startDate',
  發售日期: 'startDate',
  發行日期: 'startDate',
  开始发售日: 'startDate',
  開始發售日: 'startDate',
  首播日期: 'startDate',
  首播日期月: 'startDate',
  '1月－3月': '电视动画',
  '4月－6月': '电视动画',
  '7月－9月': '电视动画',
  '10月－12月': '电视动画'
}

const i = 0
const j = 2

const tableDom = $('#bodyContent .wikitable').eq(i)

// html转二维数组
const jQueryToArr = table => {
  const arr = []
  for (let i = 0; i < table.find('tr').length; i++) {
    const tr = table.find('tr').eq(i)
    arr.push([])
    for (let j = 0; j < tr.find('td').length; j++) {
      const td = tr.find('td').eq(j)
      arr[i].push({
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

// 表格数据映射key
const tableDataMapKey = (arrData, table) => {
  const _arrData = arrData.filter(item => item.length > 1)
  return _arrData.map(item => {
    return item.map((node, j) => {
      let keyHtmlText = trim(table.find('tr').eq(0).find('th').eq(j).text())
      if (keyHtmlText.includes('(')) keyHtmlText = keyHtmlText.substring(0, keyHtmlText.indexOf('(')) + keyHtmlText.substring(keyHtmlText.indexOf(')') + 2)
      return {
        ...node,
        key: keyMap[keyHtmlText],
        test: table.find('tr').eq(0).find('th').eq(j).text(),
        keyHtmlText
      }
    })
  })
}

// 获取表格大类
const getTableType = dom => {
  let _dom = dom
  for (let i = 0; i < 10; i++) {
    if (_dom.prev().find('.mw-headline').text()) {
      return _dom.prev().find('.mw-headline').text()
    }
    _dom = _dom.prev()
  }
  return ''
}

const trim = str => str.replace(/(^\s*)|(\s*$)/g, '')

const index = 0

const table1 = jQueryToArr(tableDom)
console.log('table1', table1[index])
const table2 = tableDataFormat(table1)
console.log('table2', table2[index])
const tableData = tableDataMapKey(table2, tableDom)
console.log('tableData', tableData[index])

const rowData = tableData[index]

const dataMap = {}
rowData.forEach(item => dataMap[item.key] = item.text)

let date = trim(dataMap.startDate || '') || ''
if (!date) date = trim(dataMap.startEndTime || '') || ''

let obj = {
  year: 2000,
  month: date.substring(0, date.indexOf('月')),
  date,
  name: cnchar.convert.tradToSimple(trim(dataMap.name || '') || ''),
  formerName: dataMap.formerName || '',
  type: keyMap[getTableType(tableDom)] || getTableType(tableDom), // mw-headline
  company: trim(dataMap.company || '') || '',
  size: trim(dataMap.size || '') || ''
}

console.log('table', tableData.length)
console.log('jQueryToArr', obj)
