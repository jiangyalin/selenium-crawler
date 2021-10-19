// 读取本地html文件并格式化
const fs = require('fs')
const jsDom = require('jsdom').JSDOM
const jquery = require('jquery')
const cnchar = require('cnchar')
const trad = require('cnchar-trad')
// const createXLsx = require('./create-xlsx')

cnchar.use(trad)

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
  // console.log('aaa', table.find('tr').eq(1).text())
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
  // console.log('arr', arr[1])
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
        key: keyMap[keyHtmlText]
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

const trim = str => {
  return str.replace(/(^\s*)|(\s*$)/g, '').replace(/\[.*?\]/g, '' )
}

const newFanChronologyAnalysis = () => {

  const list = []
  for (let k = 2000; k <= 2021; k++) {
    const html = fs.readFileSync('./html/index_' + k + '.html', 'utf8')
    const $ = jquery(new jsDom(html).window)
    const length = $('#bodyContent .wikitable').length

    for (let i = 0; i < length; i++) {
      const tableDom = $('#bodyContent .wikitable').eq(i)
      let tableData = tableDataMapKey(tableDataFormat(jQueryToArr(tableDom)), tableDom)
      console.log('tableData', tableData[0])
      const tableLength = tableData.length
      for (let j = 0; j < tableLength; j ++) {

        const dataMap = {}
        tableData[j].forEach(item => dataMap[item.key] = item.text)

        let date = trim(dataMap.startDate || '') || ''
        if (!date) date = trim(dataMap.startEndTime || '') || ''

        let obj = {
          year: k,
          month: date.substring(0, date.indexOf('月')),
          date,
          name: cnchar.convert.tradToSimple(trim(dataMap.name || '') || ''),
          formerName: dataMap.formerName || '',
          type: keyMap[getTableType(tableDom)] || getTableType(tableDom), // mw-headline
          company: trim(dataMap.company || '') || '',
          size: trim(dataMap.size || '') || ''
        }
        list.push(new ObjClass(obj))
      }
    }
  }
  return list
}

module.exports = newFanChronologyAnalysis

// console.log('newFanChronologyAnalysis', createXLsx(newFanChronologyAnalysis()))
