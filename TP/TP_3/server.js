const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const bodyParser = require('body-parser')
const todo = require('./controller/todo.js')
const user = require('./controller/user.js')

var TODO = {}
var USER = {}
var needSync = true

app.all('*', (req, res, next) => {
    next()
})

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('views', './views')
app.set('view engine', 'pug')

app.post('/todos', (req, res, next) => {
    var message = req.body.message
    todo.insertIntoTodo(message).then((result) => {
        todo.getTodos().then((result) => {
            needSync = true;
            res.redirect('/todos')
        })
    })
})

app.get('/todos', (req, res, next) => {
    var offset = req.param('offset')
    var limit = req.param('limit')
    if(offset != null && limit != null ){
        todo.getTodosOffset(offset, limit).then((result) => {

            res.render('todos/index', {
                title: 'Bonjour !',
                name: 'Toto',
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
                    name: 'Toto',
                    content: returnDict
                })
            })
        })
    }
})

app.get('/todos/:todoId', (req, res, next) => {
    var id = req.params.todoId
    var returnDict = {}
    TODO.forEach(function(element){
        if(element.id == id) {
            returnDict = element
        }
    })
    res.render('todos/show', {
            title: 'Bonjour !',
            name: 'Toto',
            content: returnDict
    })
})

app.get('/add', (req, res, next) => {
    res.render('todos/edit')
})

app.patch('/todos/:todoId', (req, res, next) => {
    var id = req.params.todoId
    todo.patchTodoById(id).then((result) => {
        res.send('DONE')
    })
})

app.get('/editTodo/:todoId', (req, res, next) => {
    var id = req.params.todoId
    todo.patchTodoById(id).then((result) => {
        res.redirect('/todos')
    })
})

app.delete('/todos/:todoId', (req, res, next) => {
    var id = req.params.todoId
    todo.deleteTodoById(id).then((result) => {
        res.send('DONE')
    })
})

app.get('/delTodos/:todoId', (req, res, next) => {
    var id = req.params.todoId
    todo.deleteTodoById(id).then((result) => {
        res.redirect('/todos')
    })
})



app.use((req, res) => {
    res.send(404, 'Not Found')
})

app.listen(PORT, () => {
    console.log('Serveur sur port:', PORT)
})