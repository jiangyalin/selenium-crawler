const fs = require('fs')
const jsDom = require('jsdom').JSDOM
const jquery = require('jquery')
const cnchar = require('cnchar')
const trad = require('cnchar-trad')
const createXLsx = require('./create-xlsx')

cnchar.use(trad)

function ObjClass({ year, month, date, name, formerName, type, company, size }) {
  this.year = year || '' // 年
  this.month = month || '' // 月
  this.date = date || '' // 开始-结束
  this.name = name || '' // 名
  this.formerName = formerName || '' // 原名
  this.type = type // 种类
  this.company = company || '' // 公司
  this.size = size || '' // size
}

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

const newFanChronologyAnalysis = () => {
  const trim = str => str.replace(/(^\s*)|(\s*$)/g, '')

  const list = []
  for (let k = 2000; k <= 2021; k++) {
    const html = fs.readFileSync('./html/index_' + k + '.html', 'utf8')
    const $ = jquery(new jsDom(html).window)
    const length = $('#bodyContent .wikitable').length

    for (let i = 1; i < length; i++) {
      const tableDom = $('#bodyContent .wikitable').eq(i)
      const tableData = tableDataSimplify(tableDataFormat(jQueryToArr(tableDom)))
      const tableLength = tableData.length
      for (let j = 1; j < tableLength; j ++) {
        const date = trim(tableData[j][0] || '')
        let obj = {
          year: k,
          month: date.substring(0, date.indexOf('月')),
          date,
          name: cnchar.convert.tradToSimple(trim(tableData[j][1] || '')),
          formerName: tableData[j][2] || '',
          type: tableDom.prev().find('.mw-headline').text(), // mw-headline
          company: trim(tableData[j][3] || ''),
          size: trim(tableData[j][4] || '')
        }
        list.push(new ObjClass(obj))
      }
    }
  }
  // console.log('list', list)
  return list
}

module.exports = newFanChronologyAnalysis

// console.log('newFanChronologyAnalysis', createXLsx(newFanChronologyAnalysis()))
