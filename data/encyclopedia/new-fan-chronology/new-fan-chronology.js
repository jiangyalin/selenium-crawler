const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('chromedriver').path // 必要，不能删除
const fs = require('fs')
const xlsx = require('node-xlsx')
const jsDom = require('jsdom').JSDOM
const jquery = require('jquery')
const config = require('../config').animation.newFanChronology

const url = config.url

async function example() {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()
  // const list = []
  try {
    await driver.get(url)
    const html = await driver.getPageSource()
    const $ = jquery(new jsDom(html).window)
    // console.log('html', html)
    // fs.writeFileSync('./index.html', html)
    // console.log('aa', $('.main-content').children('.anchor-list').item(0))
    $('.main-content').each(function () {
      console.log('class', $(this).attr('class'))
    })
    // console.log('aaa', dom.window.document.querySelectorAll('.anchor-list').textContent)

    // 生成 xlsx
    const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']]
    const buffer = xlsx.build([{ name: 'mySheetName', data: data }])
    fs.writeFileSync('./index.xlsx', buffer)

    console.log('正常结束')
  } finally {
    console.log('异常结束')
    // driver.quit()
  }
}

example()