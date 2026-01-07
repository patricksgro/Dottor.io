import redis from "../../redisClient.js"
import crypto from 'crypto'

export async function generateSessionId() {
    return crypto.randomBytes(32).toString('hex')
}

export async function createSessionId(userId) {

    //controlliamo se c'è una sessione legata a quell'utente
    const oldSessionId = await redis.get(`userSession:${userId}`)
    if (oldSessionId) {
        // Elimina la sessione vecchia
        await redis.del(`session:${oldSessionId}`)
    }

    const sessionId = await generateSessionId()

    //redis salva le cose non come un oggetto JS normale ma come un database e quindi quando fai set passi dei paramentri:
    //1 parametro = chiave (session:${sessionId}) 2 parametro = valore {userId: 'dsdnsdsd', createdAt: 2026} 3 parametro = scadenza 4 parematro = secondi
    //QUESTO è UN DATABASE
    await redis.set(
        `session:${sessionId}`,
        JSON.stringify({
            userId,
            createdAt: new Date()
        }),
        'EX',
        60 * 20
    )

    await redis.set(`userSession:${userId}`, sessionId, 'EX', 60 * 20)
    return sessionId
}

export async function getSessionId(sessionId) {
    const session = await redis.get(`session:${sessionId}`)
    return session ? JSON.parse(session) : null
}

export async function deleteSessionId(sessionId) {
    const session = await getSessionId(sessionId)
    if (session) {
        await redis.del(`userSession:${session.userId}`)
    }
    return await redis.del(`session:${sessionId}`)
}