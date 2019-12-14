const express = require('express');
const router = express.Router();
const clean = require('./../clean');

router.get('/', function (req, res) {
  console.log('get.query', req.query)
  console.log('get.params', req.params)
  console.log('req.headers.languagecode', req.headers.languagecode)
  const data = {
    'total': 'd',
    'rows': 'p'
  }
  res.jsonp(data)
})

// 添加缓存
router.post('/', function (req, res) {
  const id = req.body.id
  const date = req.body.date
  const list = clean.get().map(item => {
    return {
      ...item,
      isStorage: item.id === id || item.isStorage
    }
  })
  clean.set(list)
  const data = {
    id,
    date
  }
  res.jsonp(data)
})

module.exports = router
