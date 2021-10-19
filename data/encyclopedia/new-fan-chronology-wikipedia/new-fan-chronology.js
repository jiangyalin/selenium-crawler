// 抓取维基百科页面
const { Builder } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('chromedriver').path // 必要，不能删除
const fs = require('fs')
const config = require('../config').animation.newFanChronologyWikIpeDia

let url = config.url

const example = async callback => {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()
  try {
    for (let i = 2000; i <= 2021; i++) {
      url = 'https://zh.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E5%8B%95%E7%95%AB%E5%88%97%E8%A1%A8_(' + i + '%E5%B9%B4)'
      await driver.get(url)
      const html = await driver.getPageSource()
      fs.writeFileSync('./html/index_' + i + '.html', html)
    }
    console.log('正常结束')
  } finally {
    console.log('异常结束')
    driver.quit()
    callback()
  }
}

module.exports = example
