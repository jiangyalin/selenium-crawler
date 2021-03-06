const fs = require('fs')
const Crawler = require('crawler')

const updatedList = JSON.parse(fs.readFileSync('./list.json', 'utf8'))

const node = updatedList.node
// 创建文件夹
if (!fs.existsSync('./file/' + updatedList.bookName)) fs.mkdirSync('./file/' + updatedList.bookName)

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
node.forEach((item, i) => {
  let url = {
    uri: item.href,
    jQuery: false,

    callback: (err, res, done) => {
      if (err) console.log(err)
      if (!err) main(res, item.name)
      done()
    }
  }
  urls.push(url)
})

let i = 100000

const main = (res, name) => {
  console.log('name', name)
  i++
  fs.writeFileSync('./file/' + updatedList.bookName + '/' + name + '.jpg', res.body)
}


crawler.queue(urls)