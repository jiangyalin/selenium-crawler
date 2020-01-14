const fs = require('fs')
const { By } = require('selenium-webdriver')
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
  await driver.get(url)
  const checkError = await checkIsPresence(driver, 'center h1')
  if (!checkError) {
    const time = setInterval(() => {
      console.log('id', id)
      if (fs.existsSync(downFilePath)) {
        console.log('downFilePath', downFilePath)
        console.log('bookName', bookName)
        fs.rename(downFilePath, 'D:/down/' + bookName + '.zip', () => {})
        clearInterval(time)
        callback('success')
      }
    }, 1000)
  } else {
    await driver.get('https://www.baidu.com')
    console.log('downFilePath222', downFilePath)
    callback('error')
  }

}

// 检查是否存在
const checkIsPresence = async (driver, element) => {
  try {
    await driver.findElement(By.css(element))
    return true
  } catch  {
    return false
  }
}

module.exports = getDown