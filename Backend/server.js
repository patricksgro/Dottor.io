import express from 'express'
import http from 'http';
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './db.js'
import authRouter from './routes/authRoutes.js'
import doctorsRouter from './routes/doctorsRouter.js'
import { errorHandler } from './middlewares/errorHandler.js'
import helmet from 'helmet'
import paymentsRouter from './routes/paymentsRouter.js'
import { requireSession } from './middlewares/requireSession.js'
import webhookRputer from './routes/webhookRouter.js'
import userRouter from './routes/userRouter.js'
import bookingRouter from './routes/bookingRoutes.js'
import { initSocket } from './socket.js'
import messagesRouter from './routes/messagesRouter.js';

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_HOST,
    credentials: true
}))

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            imgSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            frameAncestors: ["'self'"]
        }
    },
    frameguard: { action: 'deny' },
    noSniff: true,
    hidePoweredBy: true,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // Strict-Transport-Security
    referrerPolicy: { policy: 'no-referrer' }, // Referrer-Policy
    permissionsPolicy: {
        features: {
            geolocation: [],
            microphone: []
        }
    }
}))

app.use('/stripe', webhookRputer)

app.use(express.json())

app.use(cookieParser())


app.use('/auth', authRouter)
app.use('/user', requireSession, userRouter)
app.use('/doctors', doctorsRouter)
app.use('/booking', requireSession, bookingRouter)
app.use('/payments', requireSession, paymentsRouter)
app.use('/messages', requireSession, messagesRouter)


app.use(errorHandler)


const httpServer = http.createServer(app);

// inizializzi Socket.IO QUI
await initSocket(httpServer)

connectDB()

httpServer.listen(process.env.PORT, () => {
    console.log(`Server attivo alla porta ${process.env.PORT}`)
})