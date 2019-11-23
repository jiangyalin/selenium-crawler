const fs = require('fs')
let bookName = '[長頼] にびいろの月 (COMIC快楽天ビースト 2017年2月号) [無邪気漢化組][MJK-19-Z1948][無修正]'
bookName = bookName.replace(/\//g,' ')
bookName = bookName.replace(/:/g,' ')
bookName = bookName.replace(/\*/g,' ')
bookName = bookName.replace(/\?/g,' ')
bookName = bookName.replace(/"/g,' ')
bookName = bookName.replace(/</g,' ')
bookName = bookName.replace(/>/g,' ')
bookName = bookName.replace(/\|/g,' ')
fs.mkdirSync('./file/' + bookName)

console.log('bookName', bookName)