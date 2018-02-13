const pug = require('pug')
const tplIndexPath = './views/message/index.pug'
const renderIndex = pug.compileFile(tplIndexPath)

module.exports = renderIndex
