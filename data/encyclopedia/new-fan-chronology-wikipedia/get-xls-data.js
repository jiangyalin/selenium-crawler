// 读取本地表格文件输出数据
const fs = require('fs')
const xlsx = require('node-xlsx')

const data = xlsx.parse(fs.readFileSync('./index.xlsx'))

// console.log('data', data[0].data)
// module.exports = data[0].data

const obj = {}
data[0].data.forEach((item, index) => {
  obj[item[6]] = (obj[item[6]] || 0) + 1
  if (item[6].includes('12話')) console.log('index', index)
})

let arr = []
for (item in obj) {
  arr.push({
    name: item,
    quantity: obj[item]
  })
  if (item.includes('13話')) console.log('arr.length', arr.length)
}

arr = arr.sort((a, b) => b.quantity - a.quantity)

console.log('arr', arr)
