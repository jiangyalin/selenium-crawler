const fs = require('fs')
const Crawler = require('crawler')

const example = (list, bookName, callback) => {
  // 创建文件夹
  if (!fs.existsSync('./file/' + bookName)) fs.mkdirSync('./file/' + bookName)
  const crawler = new Crawler({
    encoding: null, // 编码
    maxConnections: 5, // 最大并发请求数
    callback: (err, res, done) => {
      if (err) console.log(err)
      if (!err) console.log(res.options)
      done()
    }
  })

  const urls = []
  list.forEach(item => {
    if (!fs.existsSync('./file/' + bookName + '/' + item.title)) fs.mkdirSync('./file/' + bookName + '/' + item.title)
    item.img.forEach(node => {
      let url = {
        uri: node,
        jQuery: false,

        callback: (err, res, done) => {
          if (err) console.log(err)
          if (!err) main(res, item.title)
          done()
        }
      }
      urls.push(url)
    })
  })

  let i = 100000
  const main = (res, title) => {
    i++
    fs.writeFileSync('./file/' + bookName + '/' + title + '/' + i + '.jpg', res.body)
  }

  crawler.queue(urls)
  callback()
}

module.exports = example
