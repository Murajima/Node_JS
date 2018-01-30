const http = require('http')
const messageController = require('./controllers/message')
http.createServer((req, res) => {
    // On redirige vers la bonne action en fonction de l'url et de la
    méthode HTTP
    if(req.url === '/messages') {
      if (req.method === 'GET') {
    }
    return messageController.index(req, res)
    if(req.method === 'POST') {
    return messageController.create(req, res)
    }
    }
    // Dans tous les autres cas, on redirige vers /messages
    res.writeHead(302, {'Location': '/messages'})
    res.end()
}).listen(8081)