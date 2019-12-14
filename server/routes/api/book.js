const express = require('express');
const router = express.Router();

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
  const data = {
    id,
    date
  }
  res.jsonp(data)
})

module.exports = router
