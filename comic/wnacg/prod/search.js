const fs = require('fs')
const moment = require('moment')

// condition 筛选结构， showImg 是否包含图片,  isRedundancy 是否冗余（默认必须全量匹配）
const search = (condition = [], showImg = false, isRedundancy = false) => {
  const node = []
  let max = 0
  for (let i = 0; i < 5000; i++) {
    const path = './data/' + moment().add(-i, 'days').format('YYYY-MM-DD') + '.json'
    let list = {node: []}
    if (fs.existsSync(path)) list = JSON.parse(fs.readFileSync(path, 'utf8'))
    node.push(...list.node.filter(item => {
      if (!isRedundancy) return condition.filter(node => item.title.indexOf(node) === -1).length === 0
      if (isRedundancy) return condition.filter(node => item.title.indexOf(node) !== -1).length !== 0
    }).map(item => {
      max += item.node.length
      return {
        ...item,
        node: showImg ? item.node : null
      }
    }))
  }
  fs.writeFileSync('./data/search.json', JSON.stringify({tips: '', bookName: '', node}))

  return node
}





// module.exports = search

const nameList = ['ほーすている', '立花オミナ', '逢坂ミナミ', 'Cuvie', '雛咲葉']
// const nameList = ['さいもん', 'みくに瑞貴', '愛上陸', 'よこしま日記', 'あきのそら', 'Hisasi', '由浦カズヤ', '鉢本', '瓜皮汉化', '黒木秀彦', 'あとり秋尚', '黒青郎君', 'Hamao', 'SAIGADO', '舞六まいむ', '笹森トモエ', 'じょろり', '牡丹もちと', '吉田鳶牡', '杜拓哉', '華容道', '多摩豪', '幾花にいろ', 'おかゆさん', '愛上陸', 'ぎんハハ', 'IronSugar', 'ほーすている', '70年式悠久機関', 'なぱた', '三色坊', '世徒ゆうき', '柚木N', 'ホムンクルス♥', 'きい', 'SAVAN', '無邪気漢化', 'オクモト悠太', '立花オミナ', '日吉ハナ', 'mtsp', 'utu', 'kiasa', '瀬奈陽太郎', '竜太', '逢坂ミナミ', 'Cuvie', '雛咲葉', '東山翔', 'いーむす・アキ', '4K掃圖組', '萌少女領域', '夢々', 'ひぐま屋', 'Little Girl', '月ノ輪ガモ', '風的工房']
// const nameList = ['幾花にいろ', '三色坊', '黒木秀彦', '黒青郎君']
console.log(search(nameList, true, true).length)


// 愛上陸,よこしま日記，あきのそら，由浦カズヤ，鉢本，ひし形とまる，黒木秀彦，あとり秋尚，黒青郎君，
// 舞六まいむ，笹森卜モエ，じよろり，牡丹もちと，吉田鳶牡，杜拓哉，華容道，多摩豪，幾花にいろ
// おかゆさん，ぎんハハ，ほ一すている，70年式悠久機閨，なばた，三色坊，世徒ゆうき，柚木，ホ厶ンクルス
// きい，無邪気漢化，才クモ卜悠太，立花才ミナ，曰吉ハナ，瀬奈陽太郎，竜太，逢坂ミナミ
// 雛眹葉，東山翔，田中エキス，屋ひぐま屋，山田太郎，雛原えみ，美矢火，幾花にいろ
// console.log('search([\'Hamao\'])', search([]).length)