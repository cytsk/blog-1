const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

const conn = mysql.createConnection(MYSQL_CONF)
conn.connect()

function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if (err) {
                console.error("error is: ",err)
                return
            }
            console.log(result)
        })
    })
    return promise
}

module.exports = {
    exec
}