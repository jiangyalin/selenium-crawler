const express = require('express')
const router = express.Router()
const clean = require('./../clean')
const getBook = require('../../../comic/wnacg/prod/get-book.js')

router.get('/', function (req, res) {
  const id = req.query.id
  const date = req.query.date
  const data = {
    code: 200,
    data: {
      id,
      date
    }
  }
  res.jsonp(data)
})

// 添加缓存
router.post('/', function (req, res) {
  const id = req.body.id
  const date = req.body.date
  console.log('clean.get(id, date)', clean.get(id, date))
  // const list = clean.get(id, date).map(item => {
  //   return {
  //     ...item,
  //     isStorage: item.id === id || item.isStorage
  //   }
  // })
  // clean.setAll(list)
  // const json = clean.get(id, date)
  // console.log('json', json)
  getBook(id, date, () => {
    console.log('end')
  })
  const data = {
    id,
    date
  }
  res.jsonp(data)
})

module.exports = router
