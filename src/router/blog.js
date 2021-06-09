const { getList,getDetail,newBlog,updateBlog,delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const loginCheck = (req) => {

    if(!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST
    const id = req.query.id

    // get list
    if (method === 'GET' && req.path === '/api/blog/list') {

        const author = req.query.author || ''
        const keyword = req.query.keyword || ''

        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)

        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    };

    // get the detail
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const data = getDetail(id)
        // return new SuccessModel(data)
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    };

    // create a blog
    if (method === 'POST' && req.path === '/api/blog/new') {
        // const data = newBlog(req.body)
        // return new SuccessModel(data)

        // check login info
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheck
        }

        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    };

    // update a blog
    if (method === 'POST' && req.path === '/api/blog/update') {
        // check login info
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheck
        }

        const result = updateBlog(id, req.body)
        return result.then(val => {
            if(val) {
                return new SuccessModel()
            }
            return new ErrorModel('更新Blog失败')
        })
    };

    // delete a blog
    if (method === 'POST' && req.path === '/api/blog/del') {
        // check login info
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheck
        }

        const author = req.session.username
        const result = delBlog(id,author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            }else {
                return new ErrorModel('删除Blog失败')
            }
        })
    };
}

module.exports = handleBlogRouter;