const newFanChronology = require('./new-fan-chronology')
const newFanChronologyAnalysis = require('./new-fan-chronology-analysis')
const createXlsx = require('./create-xlsx')

newFanChronology()
const list = newFanChronologyAnalysis()
createXlsx(list)