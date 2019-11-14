const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('chromedriver').path // 必要，不能删除
const fs = require('fs')

const url = 'http://192.168.40.252/index.php?m=my&f=summarizes'

async function example() {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build()
  const list = []
  try {
    await driver.get(url)
    await driver.findElement(By.css('#account')).sendKeys('yalin.jiang')
    await driver.findElement(By.css('[name="password"]')).sendKeys('123456')
    await driver.findElement(By.css('#submit')).click()
    await driver.sleep(1500)
    let js = 'document.querySelector(\'#myLgModal\').classList.add(\'in\')'
    await driver.executeScript(js)
    js = 'document.querySelector(\'#myLgModal\').style.display = \'block\''
    await driver.executeScript(js)
    await driver.findElement(By.css('input.form-control.left[name="left[12463]"]')).sendKeys(9)
    await driver.findElement(By.css('input.form-control[name="work[12463]"]')).sendKeys('这是测试数据')
    js = 'document.querySelector(\'input[type="checkbox"][name="plans[12463]"]\').checked = true'
    await driver.executeScript(js)
    await driver.findElement(By.css('input.form-control#predict12463[type="number"][name="predict[12463]"]')).sendKeys(9)
    await driver.findElement(By.css('input.form-control[type="text"][name="work[12463_12463]"]')).sendKeys(' ')
    // await driver.findElement(By.css('.article-content')).sendKeys('这是测试数据')

    console.log('正常结束')
  } finally {
    console.log('异常结束')
    // driver.quit()
  }
}

example()