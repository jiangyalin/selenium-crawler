const {Builder, By, Key, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('chromedriver').path // 必要，不能删除
const fs = require('fs')
const config = require('./config').wxq

const key = config.key

async function example() {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()
  try {
    const url = 'https://www.wnacg.org/?ctl=albums&page=' + 1
    await driver.get(url)
    const html = await driver.getPageSource()
    console.log('html', html)

    console.log('正常结束')
    driver.quit()
  } finally {
    console.log('异常结束')
    driver.quit()
  }
}

example()