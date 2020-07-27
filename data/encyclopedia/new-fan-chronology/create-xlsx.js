const fs = require('fs')
const xlsx = require('node-xlsx')

module.exports = table => {
  const data = [['年', '月', '日', '开播日期', '名称', '集数', '类型']]
  table.forEach(item => {
    data.push([item.year, item.month, item.day, item.date, item.name, item.size, item.type])
  })
  const buffer = xlsx.build([{ name: 'mySheetName', data: data }])
  fs.writeFileSync('./index.xlsx', buffer)
}
