const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('chromedriver').path // 必要，不能删除
const fs = require('fs')
const config = require('../config').animation.newFanChronology

const url = config.url

const example = async () => {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()
  try {
    await driver.get(url)
    const html = await driver.getPageSource()
    fs.writeFileSync('./index.html', html)
    console.log('正常结束')
  } finally {
    console.log('异常结束')
    // driver.quit()
  }
}

module.exports = example