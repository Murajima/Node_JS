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

app.post('/todos', (req, res, next) => {
    var message = req.query.message

    if(needSync) {
        utils.getTodos().then((result) => {
            needSync = false;
            TODO = result;
            utils.insertIntoTodo(message).then((result) => {
                utils.getTodos().then((result) => {
                    needSync = true
                    res.send(TODO)
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
    console.log('ici')
    console.log(req.params.todoId)
    var id = req.params.todoId
    var returnDict = {}
    if(needSync) {
        utils.getTodos().then((result) => {
            console.log(result)
            TODO = result;
            needSync = false
            TODO.forEach(function(element){
                console.log(element)
                if(element.id == id) {
                    returnDict = element
                }
            })
            res.send(returnDict)
        })
    } else {
        TODO.forEach(function(element){
            if(element.id == id) {
                returnDict = element
            }
        })
        res.send(returnDict)
    }
})

app.get('/todos', (req, res, next) => {
    var offset = req.param('offset')
    var limit = req.param('limit')
    console.log(offset)
    utils.getTodosOffset(offset, limit).then((result) => {
        res.send(result)
    })
})

app.patch('/todos/:todoId', (req, res, next) => {
    var id = req.params.todoId
    console.log(req.params)
    utils.patchTodoById(id).then((result) => {
        res.send('DONE')
    })
})

app.delete('/todos/:todoId', (req, res, next) => {
    var id = req.params.todoId
    utils.deleteTodoById(id).then((result) => {
        res.send('DONE')
    })
})



app.use((req, res) => {
    res.send(404, 'Not Found')
})

app.listen(PORT, () => {
    console.log('Serveur sur port:', PORT)
})