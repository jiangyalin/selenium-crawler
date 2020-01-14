// 通过down链接下载压缩包
const fs = require('fs')
const getDown = require('./get-down')
const { Builder } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('chromedriver').path // 必要，不能删除

const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build()
// const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()

const updatedList = fs.readFileSync('./data/search.json', 'utf8')

const node = JSON.parse(updatedList).node

const arr = node.map(item => item)

console.log('arr', arr.map(item => item.id))

let index = 0

const queue = () => {
  if (index < arr.length) {
    const id = arr[index].id
    const date = arr[index].date
    getDown(driver, id, date, state => {
      console.log('index', index)
      console.log('state', state)
      index++
      return queue()
      // if (arr.length === 0) driver.quit()
    })
  } else {
    console.log('ddd')
    // driver.quit()
    return true
  }
}

queue()