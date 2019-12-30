/*
* 废弃
* */

// https://www.wnacg.org/photos-index-aid-90026.html
const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const fs = require('fs')
const moment = require('moment')
const path = require('chromedriver').path // 必要，不能删除
const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()

let dateArr = []

for (let i = 0; i < 5000; i ++) {
  const path = './data/' + moment().add(-i, 'days').format('YYYY-MM-DD') + '.json'
  if (fs.existsSync(path)) {
    dateArr.push({
      path,
      date: moment().add(-i, 'days').format('YYYY-MM-DD')
    })
  }
}

// dateArr = [dateArr[0]]

const getDownSrc = async (path, date, callback) => {
  let list = JSON.parse(fs.readFileSync(path, 'utf8'))
  const arr = list.node.map(item => item)
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].isDown) {
      const url = 'https://www.wnacg.org/download-index-aid-' + arr[i].id + '.html'
      await driver.get(url)
      const href = await driver.findElement(By.css('.download_btn .down_btn:nth-of-type(1)')).getAttribute('href')
      console.log('item.id', arr[i].id)
      console.log('href', href)
      arr[i].downSrc = href
      arr[i].isDown = true
    }
  }
  list.node = arr.map(item => item)

  fs.writeFileSync(path, JSON.stringify(list))
  callback()
}

const queue = async () => {
  if (dateArr.length) {
    await getDownSrc(dateArr[0].path, dateArr[0].date, () => {
      console.log(dateArr[0].date + 'end')
      dateArr.shift()
      return queue()
    })
  } else {
    driver.quit()
    return true
  }
}

console.log('dateArr', queue())

// example()