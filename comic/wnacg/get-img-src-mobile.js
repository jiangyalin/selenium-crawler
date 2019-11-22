const {Builder, By, Key, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('chromedriver').path // 必要，不能删除
const fs = require('fs')
const config = require('./config').wxq

const url = config.url
// const url = 'https://m.wnacg.org/albums-index-page-25-sname-%E7%84%A1%E9%82%AA%E6%B0%97%E6%BC%A2%E5%8C%96.html'

async function example() {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().setMobileEmulation({ deviceName: 'iPhone X' })).build()
  const list = []
  try {
    await driver.get(url)
    const html = await driver.getPageSource()
    console.log('html', html)
    for (let i = 0; i < 12; i++) {
      const title = await driver.findElement(By.css('#classify_container li:nth-of-type(' + (i + 1) + ') .txtA')).getText()
      const cover = await driver.findElement(By.css('#classify_container li:nth-of-type(' + (i + 1) + ') img')).getAttribute('src')
      const info = await driver.findElement(By.css('#classify_container li:nth-of-type(' + (i + 1) + ') .info')).getText()
      const src = await driver.findElement(By.css('#classify_container li:nth-of-type(' + (i + 1) + ') .ImgA')).getAttribute('href')
      const id = src.substring(src.lastIndexOf('-') + 1, src.lastIndexOf('.'))
      list.push({
        title,
        cover,
        info,
        src,
        id
      })
    }
    list.forEach(item => {
      console.log('item', item)
    })
    // await driver.get('https://m.wnacg.org/photos-index-aid-' + list[0].id + '.html') // /photos-slide-aid-89227.html

    console.log('正常结束')
  } finally {
    console.log('异常结束')
    // driver.quit()
  }
}

example()