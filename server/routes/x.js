const clean = require('./clean')
const getImg = require('../../comic/wnacg/prod/get-book.js')

console.log(getImg(clean.get('90023', '2019-12-05').node, '这是测试数据'))