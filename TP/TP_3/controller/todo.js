const express = require('express')
const session = require('express-session')
const todo = require('../utils/todo.js')
const user = require('../utils/user.js')

const router = express.Router();

var TODO = {}
var USER = {}
var needSync = true

router.all('*', (req, res, next) => {
    if(req.session.username == "") {
        res.redirect('/login')
    } else {
        next()
    }
})

router.post('/todos', (req, res, next) => {
    var message = req.body.message
    todo.insertIntoTodo(message, req.session.userID).then((result) => {
        todo.getTodos().then((result) => {
            needSync = true;
            res.redirect('/todos')
        })
    })
})

router.get('/todos', (req, res, next) => {
    var offset = req.param('offset')
    var limit = req.param('limit')
    if(offset != null && limit != null ){
        todo.getTodosOffset(offset, limit).then((result) => {

            res.render('todos/index', {
                title: 'Bonjour !',
                name: req.session.username,
                content: result
            })
        })
    } else {
        user.getUsers().then((result) => {
            USER = result
            todo.getTodos().then((result) => {
                TODO = result
                returnDict = []
                result.forEach(function(todo) {
                    USER.forEach(function(user){
                        if(todo.userId == user.id){
                            todo.name = user.Name
                        }
                    })
                    returnDict.push(todo)
                })
                res.render('todos/index', {
                    title: 'Bonjour !',
                    name: req.session.username,
                    content: returnDict
                })
            })
        })
    }
})

router.get('/todos/:todoId', (req, res, next) => {
    var id = req.params.todoId
    var returnDict = {}
    TODO.forEach(function(element){
        if(element.id == id) {
            returnDict = element
        }
    })
    res.render('todos/show', {
            title: 'Bonjour !',
            name: req.session.username,
            content: returnDict
    })
})

router.get('/add', (req, res, next) => {
    res.render('todos/edit')
})

router.patch('/todos/:todoId', (req, res, next) => {
    var id = req.params.todoId
    todo.patchTodoById(id).then((result) => {
        res.redirect('/todos')
    })
})

router.delete('/todos/:todoId', (req, res, next) => {
    var id = req.params.todoId
    todo.deleteTodoById(id).then((result) => {
        res.redirect('/todos')
    })
})

router.use((req, res) => {
    res.redirect('/todos')
})

module.exports = router
