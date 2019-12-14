const express = require('express');
const router = express.Router();

// 列表
router.use('/list', require('./list'));

// 缓存
router.use('/caching', require('./caching'));

// 抓取特定book
router.use('/book', require('./book'));

module.exports = router;
