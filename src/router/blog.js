const { getList,getDetail,newBlog,updateBlog,delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST
    const id = req.query.id

    // get list
    if (method === 'GET' && req.path === '/api/blog/list') {

        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)

        return new SuccessModel(listData)
    };

    // get the detail
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const data = getDetail(id)
        return new SuccessModel(data)
    };

    // create a blog
    if (method === 'POST' && req.path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SuccessModel(data)
    };

    // update a blog
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModel()
        }else {
            return new ErrorModel('更新Blog失败')
        }
    };

    // delete a blog
    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = delBlog(id)
        if (result) {
            return new SuccessModel()
        }else {
            return new ErrorModel('删除Blog失败')
        }
    };
}

module.exports = handleBlogRouter;