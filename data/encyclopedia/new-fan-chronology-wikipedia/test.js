const fs = require('fs')
const xlsx = require('node-xlsx')

const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']]
// const buffer = xlsx.build([{ name: 'mySheetName', data: data }])
const range = {s: {c: 0, r: 0}, e: {c: 0, r: 3}} // A1:A4
const options = {'!merges': [range, {s: {c: 1, r: 0}, e: {c: 1, r: 3}}]}
const buffer = xlsx.build([{name: "mySheetName", data: data}], options); // Returns a buffer
fs.writeFileSync('./index.xlsx', buffer)
