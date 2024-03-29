const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('chromedriver').path // 必要，不能删除
const fs = require('fs')
const config = require('./config').akb49

const url = config.url

const updatedList = JSON.parse(fs.readFileSync('./_list.json', 'utf8')).node
// http://20.94201314.net/dm06//ok-comic06/y/8211/act_211/z_0008_18105.JPG

async function example() {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().setMobileEmulation({ deviceName: 'iPhone X' })).build()
  const list = [...updatedList]
  try {
    await driver.get(url)
    let index = 100000
    for (let j = 0; j < 1000; j++) {
      const max = 60
      let text = ''
      for (let k = 0; k < max; k++) {
        if (await checkIsPresence(driver, '.dv_pageindex')) {
          text = await driver.findElement(By.css('.dv_pageindex')).getText()
          k = max
        } else {
          console.log('重试中', k)
          await driver.sleep(3000)
        }
      }
      const size = Number(text.split(' ')[2])
      for (let i = 0; i < size; i++) {
        const src = await driver.findElement(By.css('.dv_img img')).getAttribute('src')
        list.push({
          href: src,
          name: index++
        })
        console.log('src', src)
        const js = 'document.querySelector(\'.cViewPChange1.cNext\').click()'
        if (i < size - 1) driver.executeScript(js)
        await driver.sleep(200)
      }
      const js = 'document.querySelector(\'.cViewPChange1.cNextVol\').click()'
      driver.executeScript(js)
      await driver.sleep(1000)
    }
    fs.writeFileSync('./list.json', JSON.stringify({
      tips: '章节',
      bookName: config.name,
      node: list
    }))
    console.log('正常结束')
  } finally {
    fs.writeFileSync('./list.json', JSON.stringify({
      tips: '章节',
      bookName: config.name,
      node: list
    }))
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
