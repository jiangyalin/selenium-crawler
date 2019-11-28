const {Builder, By, Key, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('chromedriver').path // 必要，不能删除
const fs = require('fs')
const config = require('./config').wxq

// const url = config.url
const key = config.key
// const url = 'https://m.wnacg.org/albums-index-page-25-sname-%E7%84%A1%E9%82%AA%E6%B0%97%E6%BC%A2%E5%8C%96.html'

async function example() {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()
  const list = []
  try {
    const url = 'https://www.wnacg.org/?ctl=albums&page=' + n + '&sname=' + key
    await driver.get(url)

    console.log('正常结束')
    driver.quit()
    save(list)
  } finally {
    console.log('异常结束')
    driver.quit()
    save(list)
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

const save = node => {
  fs.writeFileSync('./list.json', JSON.stringify({
    tips: '章节',
    bookName: config.name,
    node: node
  }))
}

example()