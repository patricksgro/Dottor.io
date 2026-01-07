import redis from "../redisClient.js";
import { getSessionId } from "../utils/mailer/session.js";

const SESSION_TTL = 20 * 60 // 20 minuti

export async function requireSession(req, res, next) {
    try {
        const sessionId = req.cookies.sessionId
        if (!sessionId) {
            return res.status(401).json({ message: "Sessione mancante" })
        }

        const session = await getSessionId(sessionId)
        if (!session) {
            return res.status(401).json({ message: "Sessione scaduta o non valida" })
        }

        //IMPORTANTE CAMBIO:
        //NON CREIAMO UNA NUOVA SESSIONE OGNI VOLTA PERCHE QUANDO CHIAMIAMO QUESTO MIDDLEWARE PIU VOLTE (AL TERZO CLICK) FALLISCE E FA LOGOUT
        //TENIAMO LA SESSIONE VIVA PER 5 MINUTI OGNI VOLTA CHE L'UTENTE FA UN AZIONE
        //importante: SE PASSANO 5 MINNTI SENZA A AZIONI AVVIENE IL LOGOUT 

        // 🔐 Sliding expiration
        await redis.expire(`session:${sessionId}`, SESSION_TTL)

        req.user = { id: session.userId }
        next()
    } catch (err) {
        next(err)
    }
}