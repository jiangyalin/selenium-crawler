const bodyParser = require('body-parser')

module.exports = app => {

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json()) // 解析参数

  app.use('/api', require('./api'))
}