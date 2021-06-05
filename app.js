//     env: process.env.NODE_ENV
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {

        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if(!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })

    })
    return promise
}

const serverHandle = (req, res) => {
    // return JSON
    res.setHeader('Content-type' , 'application/json')

    // get path
    const url = req.url.split('?')
    req.path = url[0]

    // app query
    req.query = querystring.parse(req.url.split('?')[1])

    // get post data
    getPostData(req).then(postData => {
        req.body = postData
        const blogResult = handleBlogRouter(req, res)

        // process blog router
        if (blogResult) {
            blogResult.then(blogData => {
                return res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
    
        // const blogData = handleBlogRouter(req, res)
        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     )

            // return
        // }
            
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
    })
}

module.exports = serverHandle



// const resData = {
//     method,
//     url,
//     path,
//     query
// }

// if (method === 'GET') {
//     res.end(
//         JSON.stringify(resData)
//     )
// }

// if (method === 'POST') {
    // let postData = ''
    // req.on('data', chunk => {
    //     postData += chunk.toString()
    // })
    // req.on('end', () => {
    //     resData.postData = postData
    //     res.end(
    //         JSON.stringify(resData)
    //     )
    // })
// }
