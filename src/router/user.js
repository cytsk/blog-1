const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// get past time
const getCookieExpries = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log(d.toGMTString())
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method // GET POST

    // login
    if (method === 'GET' && req.path === '/api/user/login') {
        // const {username , password} = req.body
        const {username , password} = req.query
        const result = login(username, password)

        return result.then(data => {
            if (data.username) {
                // set session
                req.session.username = data.username
                req.session.realname = data.realname

                console.log('req.session is :',req.session)
                
                return new SuccessModel()
            }
            return new ErrorModel('login失败')
        })
    }

    if (method === 'GET' && req.path === '/api/user/login-test') {
        if(req.session.username) {
            return Promise.resolve(new SuccessModel({session : req.session}))
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

module.exports = handleUserRouter