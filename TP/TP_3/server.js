const express = require('express')
const session = require('express-session')
const app = express()
const PORT = process.env.PORT || 8080
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const todo = require('./controller/todo.js');
const user = require('./controller/user.js');
const login = require('./controller/login.js');
var i = 0


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('views', './views')
app.set('view engine', 'pug')
app.use(methodOverride('_method'))
app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 60000 }}));


app.all('*', (req, res, next) => {
    if(i == 0){
        req.session.username = ""
        i = 1
    }
    next()
})

app.use('/login', login)
app.use('/users', user)
app.use('/', todo)



app.listen(PORT, () => {
    console.log('Serveur sur port:', PORT)
})