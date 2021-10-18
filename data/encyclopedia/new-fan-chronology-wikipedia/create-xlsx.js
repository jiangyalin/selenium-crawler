const fs = require('fs')
const xlsx = require('node-xlsx')

module.exports = table => {
  const data = []
  table.forEach(item => {
    data.push([item.year, item.month, item.date, item.name, item.formerName, item.type, item.company, item.size])
  })
  const buffer = xlsx.build([{ name: 'mySheetName', data: data }])
  fs.writeFileSync('./index.xlsx', buffer)
}
