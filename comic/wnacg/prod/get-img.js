const fs = require('fs')
const Crawler = require('crawler')

const getImg = (list, name) => {
  const path = __dirname + '/book/' + name
  const node = list

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

  const main = (res, name) => {
    console.log('name', name)
    i++
    fs.writeFileSync(path + '/' + name + '.png', res.body)
  }

  crawler.queue(urls)
}

module.exports = getImg