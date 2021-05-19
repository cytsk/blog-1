const http = require('http')

// post
const POST = 3000
const serverHandle = require('../app')

const server = http.createServer(serverHandle)
server.listen(POST)
console.log('OK')