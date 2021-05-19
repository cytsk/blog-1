const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST

    // get list
    if (method === 'GET' && req.path === '/api/blog/list') {
        return {
            msg: 'This is the interface of blog'
        }
    }

    // get the detail
    if (method === 'GET' && req.path === '/api/blog/detail') {
        return {
            msg: 'This is the interface of blog'
        }
    }

    // create a blog
    if (method === 'POST' && req.path === '/api/blog/new') {
        return {
            msg: 'This is the interface of creating blog'
        }
    }

    // update a blog
    if (method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: 'This is the interface of updating blog'
        }
    }

    // delete a blog
    if (method === 'POST' && req.path === '/api/blog/del') {
        return {
            msg: 'This is the interface of deleting blog'
        }
    }
}

module.exports = handleBlogRouter