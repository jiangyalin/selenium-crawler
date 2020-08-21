const getChapter = require('./get-chapter') // 访问章节列表
const getWords = require('./get-words') // 访问话
const downImg = require('./down-img') // 下载图片
const url = require('./config').haiMao
const title = 'haiMao'
console.log('url', url)

getChapter(url, wordList => {
  console.log('wordList', wordList)
  getWords(wordList, imgList => {
    console.log('imgList', imgList)
    downImg(imgList, title, () => {

    })
  })
})




