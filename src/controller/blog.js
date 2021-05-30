const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select id,title,content,author from blogs where 1=1 `
    if (author) {
        sql += `and author = '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
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