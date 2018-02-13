const Message = require('../models/messageModel.js')
function index(req, res) {
    res.write('Index action -> à completer')
    res.end()
}

function create(req, res) {
    res.write('Create action -> à completer')
    res.end()
}
module.exports = { create, index }