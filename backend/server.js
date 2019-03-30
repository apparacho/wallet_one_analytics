const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()
const bodyParser = require("body-parser");

const port = 8080

server.use(middlewares)

server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})

server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/Templates/new_template_data': '/newTemplateData'
}))

server.use(bodyParser.json());
server.post('/Templates', (req, res) => {
    console.log(req)
    console.log(req.body)
    return res.jsonp({
        success: true
    })
})


server.use(router)
server.listen(port, () => {
    console.log(`JSON Server is running! \r\n Home: \r\n http://localhost:${port}`)
})