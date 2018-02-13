const Message = require('../models/messageModel.js')
const db = require('../db.js')
const qs = require('querystring');
const renderIndex = require('../app.js')
function index(req, res) {
    SelectQuery().then((result) => {
        const html = renderIndex({
            messages: result
        })
        res.writeHead(200, { 'Content-Type': 'text/html' } )
        res.write(html)
        res.end()
    })
}

function create(req, res) {
    InsertQuery(req, res).then((result) => {
        index(req, res)
    })
}

module.exports = { create, index }


function SelectQuery() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM `messages`", { type: db.QueryTypes.SELECT}).then(messages => {
            resolve(messages)
        })
    });
}

function InsertQuery(req, res) {
    var body = ''
    return new Promise((resolve, reject) => {
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var jsonObj = qs.parse(body)
            Message.create({
                User: jsonObj.pseudo,
                Message: jsonObj.Message
            }).then(() => {
                resolve("data saved")
            })
        });
    });
}