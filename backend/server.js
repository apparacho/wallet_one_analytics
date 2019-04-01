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

// server.use(bodyParser.json());
// server.post('/Templates', (req, res) => {
//     console.log(req)
//     console.log(req.body)
//
//     return res.jsonp({ success: true })
// })

// const newTemplate = {
//   "id": Date.now(),
//   "name": "test template 2",
//   "templateType": 0,
//   "templateColumns": [
//     {
//       "name": "DealSum",
//       "humanReadableName": "Сумма сделки",
//       "dataType": 1
//     }
//   ],
//   "filters": [],
//   "aggregationFunctions": [],
//   "reportingSystem": null,
//   "user": null,
//   "reportingSystemId": "8a96857-0c53-431e-886a-886b65b81e98",
//   "userId": "bd504b3f-81fe-42ca-b966-675515b07af9"
// }


server.use(router)
server.listen(port, () => {
    console.log(`JSON Server is running! \r\n Home: \r\n http://localhost:${port}`)
})