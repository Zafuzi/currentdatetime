// content of index.js
const http = require('http')
const port = 12345

const requestHandler = (request, response) => {
    console.log(request.url)
    let date = new Date()
    response.end('Current date and time: ' + date)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})