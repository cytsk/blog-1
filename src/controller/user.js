const loginCheck = (username, password) => {
    if (username === 'zhangsan' && password === '123') {
        console.log('login status....',username,password)
        return true
    }
    return false
}

module.exports = {
    loginCheck
}