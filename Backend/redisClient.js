import 'dotenv/config'
import Redis from 'ioredis';

let redis;

if (process.env.REDIS_URL) {
    redis = new Redis({
        url: process.env.REDIS_URL,
        tls: process.env.REDIS_USE_TLS === 'true' ? {} : undefined
    })
} else {
    redis = new Redis({
        host: '127.0.0.1',
        port: 6379
    })
}

redis.on('connect', () => {console.log('Connesso a Redis')})

redis.on('error', () => {console.log('Errore di connessione a Redis')})

export default redis