const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
    // return JSON
    res.setHeader('Content-type' , 'application/json')

    // get path
    const url = req.url
    req.path = url

    // process blog router
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
        res.end(
            JSON.stringify(blogData)
        )

        return
     }
        
    // process user router
    const userData = handleUserRouter(req, res)
    if(userData) {
        res.end(
            JSON.stringify(userData)
        )

        return
    }

    // 404 none
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
}

module.exports = serverHandle
