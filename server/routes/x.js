const clean = require('./clean')
const getImg = require('./../../comic/wnacg/prod/get-img.js')

console.log(getImg(clean.get('90023', '2019-12-05').node, '这是测试数据'))