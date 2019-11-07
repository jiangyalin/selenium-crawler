const {Builder, By, Key, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const _path = require('chromedriver').path
const path = require('path')
const fs = require('fs')

console.log('Options', chrome.Options)
console.log('_path', _path)
const url = 'http://preconsole.71360.com/home/index'
// const url = 'http://localhost:8080/buildPlatform/index'
async function example() {
  // const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build() // 无头浏览器
  const driver = new Builder().forBrowser('chrome').setChromeOptions().build() // 无头浏览器
  try {
    await driver.get(url)
    await driver.findElement(By.css('#app .login .login-container .el-form .el-form-item:nth-of-type(1) .el-input__inner')).sendKeys('yfbcsniya3')
    await driver.findElement(By.css('#app .login .login-container .el-form .el-form-item:nth-of-type(2) .el-input__inner')).sendKeys('zhendao123@123')
    const btn = await driver.findElement(By.css('#app .login .login-container .el-form .el-form-item:nth-of-type(3) button'))
    console.log('aaa')
    await driver.sendDevToolsCommand('Emulation.setDeviceMetricsOverride', {
      mobile: true,
      width: 412,
      height: 732,
      deviceScaleFactor: 2.625
    })
    console.log('btn', await btn.getAttribute('type'))
    await btn.click()
    const fileName = path.join(__dirname, './save/aaa.jpg')
    fs.writeFileSync(fileName, await driver.takeScreenshot(), 'base64')
  } finally {
    // driver.quit()
  }
}

example()