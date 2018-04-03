const express = require('express')
const session = require('express-session')
const todo = require('../utils/todo.js')
const user = require('../utils/user.js')

const router = express.Router();

router.post('/', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    user.insertIntoUsers(username, password).then((result) => {
        user.getUsers().then((result) => {
            res.redirect('/login')
        })
    })
})

router.get('/register', (req, res, next) => {
    res.render('user/edit')
})

module.exports = router