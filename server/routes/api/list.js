const express = require('express');
const router = express.Router();
const clean = require('./../clean');

// 获取列表数据
router.get('/', function (req, res) {
  const data = {
    data: clean.get().map(item => {
      return {
        ...item,
        title: item.title.substring(0, 1) + '这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
        cover: 'http://preapiconsole.71360.com/file/read/www/M00/00/0B/wKgBbF2yUMKAdpDMAAQJhP1oO1Q130.jpg'
      }
    })
  }
  res.jsonp(data)
})

module.exports = router
