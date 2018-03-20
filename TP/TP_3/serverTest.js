const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const bodyParser = require('body-parser')

app.get('/hello-world', (req, res) => {
    res.send('Bonjour à tous')
})

app.get('/users/:userId', (req, res) => {
    res.send('User to load is:' + req.params.userId)
})



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.post('/test', (req, res, next) => {
    console.log(req.body)
    res.send('On a parsé le body !')
})


app.use(express.static('assets'))

app.use((req, res) => {
    res.send(404, 'Not Found')
})

app.listen(PORT, () => {
    console.log('Serveur sur port:', PORT)
})