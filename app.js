//     env: process.env.NODE_ENV
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const SESSION_DATA = {}

// get past time
const getCookieExpries = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log(d.toGMTString())
    return d.toGMTString()
}

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

    // revise cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if(!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    });
    // console.log('req.cookie is: ', req.cookie)

    // revise session
    let needSetCookie = false
    let userId = req.cookie.userid
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }        
    } else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    // app query
    req.query = querystring.parse(req.url.split('?')[1])

    // get post data
    getPostData(req).then(postData => {
        req.body = postData
        const blogResult = handleBlogRouter(req, res)

        // process blog router
        if (blogResult) {
            blogResult.then(blogData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expries=${getCookieExpries()}`)
                }
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
        const userResult = handleUserRouter(req, res)
        if(userResult) {
            userResult.then(userData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expries=${getCookieExpries()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
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
