const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/:name', (req, res) => {
  const id = req.query.id
  const date = req.query.date
  const data = {
    code: 200,
    data: {
      id,
      date
    }
  }
  const path = __dirname + './../../comic/wnacg/prod/book/test-01.jpg'
  console.log('aaa')
  console.log('bb', new Buffer(fs.readFileSync(path)).toString('base64'))
  res.jsonp(fs.readFileSync(path))
})

module.exports = router
