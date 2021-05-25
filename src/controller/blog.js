const getList = (author, keyword) => {
return [
    {
        id: 1,
        title: 'タイトル1',
        content: '内容1',
        createTime: 1621736909331,
        author: 'zhangsan'
    },
    {
        id: 2,
        title: 'タイトル2',
        content: '内容2',
        createTime: 1621736973035,
        author: 'lisi'
    }
]
}

const getDetail = (id) => {
    return [
        {
            id: 1,
            title: 'タイトル1',
            content: '内容1',
            createTime: 1621736909331,
            author: 'zhangsan'
        }
    ]
}

const newBlog = (blogData = {}) => {

    console.log('blogData new blog....', blogData)
    return {
        id: 3
    }

}

const updateBlog = (id, blogData = {}) => {
    console.log('update blog....',id,blogData)
    return true
}

const delBlog = (id) => {
    console.log('delete blog....',id)
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}