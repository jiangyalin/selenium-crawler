// const newFanChronology = require('./new-fan-chronology')
const newFanChronologyAnalysis = require('./new-fan-chronology-analysis')
const createXLsx = require('./create-xlsx')

// newFanChronology(() => {
//   // const list = newFanChronologyAnalysis()
//   // createXLsx(list)
// })

// console.log('list', newFanChronologyAnalysis())
const list = newFanChronologyAnalysis()
createXLsx(list)
