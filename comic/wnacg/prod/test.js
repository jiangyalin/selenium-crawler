const fs = require('fs')
const getDown = require('./get-down')
const { Builder } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('chromedriver').path // 必要，不能删除

const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build()

const updatedList = fs.readFileSync('./data/search.json', 'utf8')

const node = JSON.parse(updatedList).node

const arr = [node.map(item => item)[1], node.map(item => item)[2], node.map(item => item)[3], node.map(item => item)[4]]

const queue = () => {
  if (arr.length) {
    getDown(driver, arr[0].id, arr[0].date, () => {
      console.log(arr[0].id + 'end')
      arr.shift()
      return queue()
    })
  } else {
    // driver.quit()
    return true
  }
}

queue()