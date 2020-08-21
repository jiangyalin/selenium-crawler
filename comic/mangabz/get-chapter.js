// 章节列表
const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const jsDom = require('jsdom').JSDOM
const jquery = require('jquery')
const path = require('chromedriver').path // 必要，不能删除
const host = require('./config').host

const example = async (url, callback) => {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()
  await driver.get(url)
  try {
    await driver.get(url)
    let $ = jquery(new jsDom(await driver.getPageSource()).window)
    const chapterList = []
    for (let i = 0; i < $('.container .detail-list-form-con a').length; i++) {
      const href = $('.container .detail-list-form-con a').eq(i).attr('href')
      const title = $('.container .detail-list-form-con a').eq(i).text()
      chapterList.push({
        href: host + href,
        title: title.replace(/ /g, ''),
        size: Number(title.substring(title.indexOf('（') + 1, title.indexOf('P）')))
      })
    }
    driver.quit()
    setTimeout(() => {
      callback(chapterList)
    }, 1000)
    console.log('章节列表正常结束')
  } catch {
    driver.quit()
    console.log('章节列表异常结束')
  }
}

/*
* 1. http://www.mangabz.com/172bz/
* 2. http://www.mangabz.com/m15783/
* 3. http://www.mangabz.com/m15781/#ipg2
* 4. http://www.mangabz.com/m15781/#ipg3
* 5. http://www.mangabz.com/m15783-p3/
* */

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
