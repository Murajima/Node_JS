const express = require('express')
const session = require('express-session')
const app = express()
const PORT = process.env.PORT || 8080
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const todo = require('./controller/todo.js');
const user = require('./controller/user.js');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('views', './views')
app.set('view engine', 'pug')
app.use(methodOverride('_method'))


app.use('/users', user)
app.use('/', todo)

app.listen(PORT, () => {
    console.log('Serveur sur port:', PORT)
})