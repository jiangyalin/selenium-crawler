const {Builder, By, Key, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const moment = require('moment')
const path = require('chromedriver').path // 必要，不能删除
const save = require('./add-json')

const key = ''

async function example() {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()
  const list = []
  try {
    for (let n = 3852; n < 9999; n++) {
      const url = 'https://www.wnacg.org/?ctl=albums&page=' + n + '&sname=' + key
      const _list = []
      await driver.get(url)
      for (let i = 0; i < 12; i++) {
        if (await checkIsPresence(driver, '.cc li:nth-of-type(' + (i + 1) + ') img')) {
          const title = await driver.findElement(By.css('.cc li:nth-of-type(' + (i + 1) + ') .title a')).getText()
          const cover = await driver.findElement(By.css('.cc li:nth-of-type(' + (i + 1) + ') img')).getAttribute('src')
          const info = await driver.findElement(By.css('.cc li:nth-of-type(' + (i + 1) + ') .info_col')).getText()
          const src = await driver.findElement(By.css('.cc li:nth-of-type(' + (i + 1) + ') .pic_box a')).getAttribute('href')
          const id = src.substring(src.lastIndexOf('-') + 1, src.lastIndexOf('.'))
          const size = Number(info.substring(0, info.lastIndexOf('張')))
          const date = moment(info.substring(info.lastIndexOf('創建於') + 3)).format('YYYY-MM-DD')
          _list.push({
            title,
            cover,
            info,
            src,
            id,
            size,
            date,
            isStorage: false,
            localName: '',
            node: []
          })
        }
      }
      _list.forEach(item => {
        console.log('item', item.date)
      })
      // 获取每一组
      for (let k = 0; k < _list.length; k++) {
        await driver.get(_list[k].src)

        // 获取每一页
        for (let i = 0; i < Math.ceil(_list[k].size / 12); i++) {
          let size = (_list[k].size - i * 12) >= 12 ? 12 : _list[k].size - i * 12

          // 获取每一张图片
          for (let j = 0; j < size; j++) {
            if (await checkIsPresence(driver, 'ul.cc li:nth-of-type(' + (j + 1) + ') img')) {
              const src = await driver.findElement(By.css('ul.cc li:nth-of-type(' + (j + 1) + ') img')).getAttribute('src')
              _list[k].node.push({
                page: i * 12 + j + 1,
                src
              })
            }
          }
          if (i < Math.ceil(_list[k].size / 12) - 1) {
            if (await checkIsPresence(driver, 'span.next a')) {
              const next = await driver.findElement(By.css('span.next a')).getAttribute('href')
              await driver.get(next)
            } else {
              i = Math.ceil(_list[k].size / 12)
            }
          }
        }
      }
      console.log('page', n)
      _list.forEach(item => {
        save(item.date, item, item.title)
        list.push(item)
      })
    }

    console.log('正常结束')
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