// 话
const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('chromedriver').path // 必要，不能删除

const example = async (list, callback) => {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()
  try {
    for (let i = 0; i < list.length; i++) {
      const imgList = []
      for (let j = 0; j < list[i].size; j++) {
        const pageUrl = list[i].href.substring(0, list[i].href.length - 1) + '-p' + (j + 1)
        console.log('pageUrl', pageUrl)
        await driver.get(pageUrl)
        const max = 10
        for (let k = 0; k < max; k++) {
          await driver.sleep(500)
          if (await checkIsPresence(driver, '#cp_image')) {
            const img = await driver.findElement(By.css('#cp_image')).getAttribute('src')
            console.log('img', img)
            imgList.push(img)
            k = max
          }
        }
      }
      list[i].img = imgList
    }
    driver.quit()
    setTimeout(() => {
      callback(list)
    }, 1000)
    console.log('话正常结束')
  } catch {
    driver.quit()
    console.log('话异常结束')
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

module.exports = example
