const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// create client
const redisClinet = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClinet.on('error', err => {
    console.log(err)
})

function set(key, val) {
    if(typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClinet.set(key, val, redis.print)

}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClinet.get(key, (err, val) => {
            if(err) {
                reject(err)
                return
            }
            
            if(val == null) {
                resolve(null)
                return
            }

            try {
                resolve(JSON.parse(val))
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    get,
    set
}