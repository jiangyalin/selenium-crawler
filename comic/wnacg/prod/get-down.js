const fs = require('fs')
const clean = require('./../../../server/routes/clean')

const getDown = async (driver, id, date, callback) => {
  const json = clean.get(id, date)
  const name = json.title

  let bookName = name.replace(/\\/g,' ')
  bookName = bookName.replace(/\//g,' ')
  bookName = bookName.replace(/:/g,' ')
  bookName = bookName.replace(/\*/g,' ')
  bookName = bookName.replace(/\?/g,' ')
  bookName = bookName.replace(/"/g,' ')
  bookName = bookName.replace(/</g,' ')
  bookName = bookName.replace(/>/g,' ')
  bookName = bookName.replace(/\|/g,' ')

  // bookName = 'xx'

  // 是否创建原图文件夹
  // const path = __dirname + '/book/' + bookName
  // if (!fs.existsSync(path)) fs.mkdirSync(path)

  const url = json.downSrc
  const downName = url.substring(url.lastIndexOf('/') + 1)
  await driver.setDownloadPath('D:\\down')
  await driver.get(url)
  console.log('downName', downName)
  const downFilePath = 'D:/down/' + downName
  const time = setInterval(() => {
    if (fs.existsSync(downFilePath)) {
      fs.rename(downFilePath, 'D:/down/' + bookName + '.zip', () => {})
      clearInterval(time)
      callback()
    }
  }, 1000)

}

module.exports = getDown