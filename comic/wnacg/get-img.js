const fs = require('fs')
const Crawler = require('crawler')

const updatedList = fs.readFileSync('./list.json', 'utf8')

const node = JSON.parse(updatedList).node

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
node.forEach(item => {
  let bookName = item.title.replace(/\\/g,' ')
  bookName = bookName.replace(/\//g,' ')
  bookName = bookName.replace(/:/g,' ')
  bookName = bookName.replace(/\*/g,' ')
  bookName = bookName.replace(/\?/g,' ')
  bookName = bookName.replace(/"/g,' ')
  bookName = bookName.replace(/</g,' ')
  bookName = bookName.replace(/>/g,' ')
  bookName = bookName.replace(/\|/g,' ')
  fs.mkdirSync('./file/' + bookName)
  item.node.forEach(data => {
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
})

let i = 100000

const main = (res, name, bookName) => {
  console.log('name', name)
  i++
  fs.writeFileSync('./file/' + bookName + '/' + name + '.png', res.body)
}


crawler.queue(urls)