const fs = require('fs')
const Crawler = require('crawler')
const tool = require('./../../tool')

const updatedList = JSON.parse(fs.readFileSync('./list.json', 'utf8'))

let name = 10000
const node = updatedList.node.filter(item => item.href.indexOf('vol_0') === -1).map(item => {
  return {
    ...item,
    name: name++
  }
})
// console.log('node', node)

// 创建文件夹
tool.createFolder('./file/' + updatedList.bookName)

let crawler = new Crawler({
  encoding: null, // 编码
  maxConnections: 10, // 最大并发请求数
  callback: (err, res, done) => {
    if (err) console.log(err)
    if (!err) console.log(res.options)
    done()
  }
})

const urls = []
node.filter(item => {
  const pamphlet = Math.ceil((item.name - 10000 + 1) / 300) + 100
  if (fs.existsSync('./file')) {
    if (fs.existsSync('./file/' + updatedList.bookName + '/' + pamphlet)) {
      if (fs.existsSync('./file/' + updatedList.bookName + '/' + pamphlet + '/' + item.name + '.jpg')) {
        return false
      }
    }
  }
  return true
}).forEach(item => {
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

const main = (res, name) => {
  const pamphlet = Math.ceil((name - 10000 + 1) / 300) + 100
  tool.createFolder('./file/' + updatedList.bookName + '/' + pamphlet)
  console.log('name', name)
  fs.writeFileSync('./file/' + updatedList.bookName + '/' + pamphlet + '/' + name + '.jpg', res.body)
}

crawler.queue(urls)
