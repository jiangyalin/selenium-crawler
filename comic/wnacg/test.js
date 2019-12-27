// https://www.wnacg.org/photos-index-aid-90026.html
const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const moment = require('moment')
const path = require('chromedriver').path // 必要，不能删除

async function example() {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()
  try {
    const url = 'https://www.wnacg.org/download-index-aid-90026.html'
    await driver.get(url)
    const html = await driver.getPageSource()
    console.log('html', html)
    // for (let i = 0; i < 12; i++) {
    //   if (await checkIsPresence(driver, '.cc li:nth-of-type(' + (i + 1) + ') img')) {
    //     const title = await driver.findElement(By.css('.cc li:nth-of-type(' + (i + 1) + ') .title a')).getText()
    //     const cover = await driver.findElement(By.css('.cc li:nth-of-type(' + (i + 1) + ') img')).getAttribute('src')
    //     const info = await driver.findElement(By.css('.cc li:nth-of-type(' + (i + 1) + ') .info_col')).getText()
    //     const src = await driver.findElement(By.css('.cc li:nth-of-type(' + (i + 1) + ') .pic_box a')).getAttribute('href')
    //     const id = src.substring(src.lastIndexOf('-') + 1, src.lastIndexOf('.'))
    //     const size = Number(info.substring(0, info.lastIndexOf('張')))
    //     const date = moment(info.substring(info.lastIndexOf('創建於') + 3)).format('YYYY-MM-DD')
    //   }
    // }

    console.log('正常结束')
    driver.quit()
  } finally {
    console.log('异常结束')
    driver.quit()
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

example()