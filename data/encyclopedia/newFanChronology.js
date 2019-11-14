const {Builder, By, Key, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('chromedriver').path // 必要，不能删除
const fs = require('fs')
const config = require('./config').animation.newFanChronology

const url = config.url

async function example() {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()
  const list = []
  try {
    await driver.get(url)
    console.log('await driver.getPageSource()', await driver.getPageSource())
    // fs.writeFileSync('./list.json', JSON.stringify({
    //   tips: '章节',
    //   bookName: config.name,
    //   node: list
    // }))
    console.log('正常结束')

  } finally {
    // fs.writeFileSync('./list.json', JSON.stringify({
    //   tips: '章节',
    //   bookName: config.name,
    //   node: list
    // }))
    console.log('异常结束')
    // driver.quit()
  }
}

example()