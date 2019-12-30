const fs = require('fs')
const axios = require('axios')
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
  const downFilePath = 'D:/down/' + downName
  const status = await axios({
    url,
    method: 'get',
    timeout: 1000 * 5
  }).then(res => res).catch(err => err)
  const checkError = status.toString().indexOf('Request failed with status code') !== -1
  if (!checkError) {
    await driver.get(url)
    const time = setInterval(() => {
      if (fs.existsSync(downFilePath)) {
        setTimeout(() => {
          fs.rename(downFilePath, 'D:/down/' + bookName + '.zip', () => {})
          clearInterval(time)
          callback()
        }, 2000)
      }
    }, 1000)
  } else {
    callback()
  }

}

module.exports = getDown