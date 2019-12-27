const fs = require('fs')
const search = require('./search')
const zip = require('./zip')
const clean = require('./../../../server/routes/clean')
const Crawler = require('crawler')

const getBook = (id, date, callback, isUnit = false) => {
  const json = clean.get(id, date)
  const list = json.node
  const name = json.title

  const node = list
  let count = 0 // 已完成数

  let crawler = new Crawler({
    encoding: null, // 编码
    maxConnections: 5, // 最大并发请求数
    callback: (err, res, done) => {
      if (err) console.log(err)
      if (!err) console.log(res.options)
      done()
    }
  })

  const urls = []
  let bookName = name.replace(/\\/g,' ')
  bookName = bookName.replace(/\//g,' ')
  bookName = bookName.replace(/:/g,' ')
  bookName = bookName.replace(/\*/g,' ')
  bookName = bookName.replace(/\?/g,' ')
  bookName = bookName.replace(/"/g,' ')
  bookName = bookName.replace(/</g,' ')
  bookName = bookName.replace(/>/g,' ')
  bookName = bookName.replace(/\|/g,' ')

  const path = __dirname + '/book/' + bookName
  if (!fs.existsSync(path)) fs.mkdirSync(path)

  node.forEach(data => {
    const url = {
      uri: data.src,
      jQuery: false,

      callback: (err, res, done) => {
        if (err) console.log(err)
        if (!err) main(res, (data.page + 1000), bookName)
        done()
      }
    }
    urls.push(url)
  })

  let i = 100000

  const main = (res, sn) => {
    console.log('sn', sn)
    i++
    count++
    fs.writeFileSync(path + '/' + sn + '.png', res.body)
    // 已完全结束
    if (count === list.length) {
      zip()
      // 全量刷新
      if (!isUnit) {
        // 记录数据
        clean.set(id, date, {
          localName: bookName,
          isStorage: true
        })
        search()
      }
      callback()
    }
  }

  crawler.queue(urls)
}

module.exports = getBook