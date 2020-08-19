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
        await driver.sleep(1000)
        if (await checkIsPresence(driver, '#cp_image')) {
          const img = await driver.findElement(By.css('#cp_image')).getAttribute('src')
          console.log('img', img)
          imgList.push(img)
        }
      }
      list[i].img = imgList
    }
    driver.quit()
    setTimeout(() => {
      callback(list)
    }, 1000)
    console.log('正常结束')
  } catch {
    driver.quit()
    console.log('异常结束')
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
