const fs = require('fs')
const getBook = require('./get-book')

const updatedList = fs.readFileSync('./data/search.json', 'utf8')

const node = JSON.parse(updatedList).node

const arr = node.map(item => item)

// arr.forEach(item => {
//   // getBook(item.id, item.date, () => {
//   //   console.log(item.id + 'end')
//   // })
// })

const _getBook = (id, date, callback) => {
  setTimeout(() => {
    callback()
  }, 500)
}

const queue = () => {
  if (arr.length) {
    _getBook(arr[0].id, arr[0].date, () => {
      console.log(arr[0].id + 'end')
      arr.shift()
      return queue()
    })
  } else {
    return true
  }
}

queue()

// console.log('node', node[0])