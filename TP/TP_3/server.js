const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const bodyParser = require('body-parser')
const utils = require('./utils.js')

var TODO = {}
var needSync = true

app.all('*', (req, res, next) => {
    console.log('-> ALL *')
    next()
})

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('views', './views')
app.set('view engine', 'pug')

app.post('/todos', (req, res, next) => {
    var message = req.body.message

    if(needSync) {
        utils.getTodos().then((result) => {
            needSync = false;
            TODO = result;
            utils.insertIntoTodo(message).then((result) => {
                utils.getTodos().then((result) => {
                    needSync = true
                    res.redirect('/todos')
                })
            })
        })
    } else {
        utils.insertIntoTodo(message).then((result) => {
            utils.getTodos().then((result) => {
                needSync = true;
                res.send(TODO)
            })
        })
    }
})

app.get('/todosGET', (req, res, next) => {
    utils.getTodos().then((result) => {
        res.send(result)
    })
})

app.get('/todos/:todoId', (req, res, next) => {
    // var id = req.param('id')
    console.log(req.params.todoId)
    var id = req.params.todoId
    var returnDict = {}
    if(needSync) {
        utils.getTodos().then((result) => {
            TODO = result;
            needSync = false
            TODO.forEach(function(element){
                if(element.id == id) {
                    returnDict = element
                }
            })
            console.log(returnDict)
            res.render('show', {
                title: 'Bonjour !',
                name: 'Toto',
                content: returnDict
            })
        })
    } else {
        TODO.forEach(function(element){
            if(element.id == id) {
                returnDict = element
            }
        })
        res.render('show', {
                title: 'Bonjour !',
                name: 'Toto',
                content: returnDict
            })
    }
})

app.get('/add', (req, res, next) => {
    console.log('ici')
    res.render('edit')
})

app.get('/todos', (req, res, next) => {
    var offset = req.param('offset')
    var limit = req.param('limit')
    if(offset != null && limit != null ){
        console.log('ici')
        utils.getTodosOffset(offset, limit).then((result) => {

            res.render('index', {
                title: 'Bonjour !',
                name: 'Toto',
                content: result
            })
        })
    } else {
        utils.getTodos().then((result) => {
            res.render('index', {
                title: 'Bonjour !',
                name: 'Toto',
                content: result
            })
        })
    }
})

app.patch('/todos/:todoId', (req, res, next) => {
    var id = req.params.todoId
    utils.patchTodoById(id).then((result) => {
        res.send('DONE')
    })
})

app.get('/editTodo/:todoId', (req, res, next) => {
    var id = req.params.todoId
    utils.patchTodoById(id).then((result) => {
        res.redirect('/todos')
    })
})

app.delete('/todos/:todoId', (req, res, next) => {
    var id = req.params.todoId
    utils.deleteTodoById(id).then((result) => {
        res.send('DONE')
    })
})

app.get('/delTodos/:todoId', (req, res, next) => {
    var id = req.params.todoId
    utils.deleteTodoById(id).then((result) => {
        res.redirect('/todos')
    })
})



app.use((req, res) => {
    res.send(404, 'Not Found')
})

app.listen(PORT, () => {
    console.log('Serveur sur port:', PORT)
})