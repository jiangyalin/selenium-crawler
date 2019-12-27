// 实体类
function book(title, cover, info, src, id, size, date, node, isStorage, localName, isDown, isOriginalIme) {
  this.title = title || '' // 原文标题
  this.cover = cover || '' // 封面
  this.info = info || '' // 原文辅助信息
  this.src = src || '' // 详情页地址
  this.id = id || ''
  this.size = size || '' // 总页数
  this.date = date || '' // 上传日期
  this.node = node || [] // 内容详情
  this.isStorage = isStorage || false // 是否已保存到本地
  this.localName = localName || '' // 本地文件名
  this.isDown = isDown || false // 是否已获取下载信息
  this.isOriginalIme = isOriginalIme || false // 是否已获取原图信息
}

module.exports = book