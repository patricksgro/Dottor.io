import User from '../../models/Users.js'
import Otp from '../../models/Otp.js'
import { sendOtpEmail } from '../../utils/mailer/emailService.js'
import { generateOTP } from '../../utils/mailer/generateOtp.js'
import { createSessionId, deleteSessionId } from '../../utils/mailer/session.js'
import redis from '../../redisClient.js'


//GESTIONE FLUSSO LOGIN, REGISTER E LOGOUT CON OTP

const MAX_ATTEMPTS = 5
const ATTEMPT_WINDOW = 300 // 5 minuti

export async function login(req, res, next) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Inserire email e password' })
        }

        const attemptsKey = `login_attempts:${email}`;  //numeri di tentativi usiamo redis ed associamo l'email dell'utente
        const lockKey = `login_lock:${email}`;  //ci serve per capire se l'utente è stato bloccato (quindi ha fatto troppi tentativi) o meno

        const isLocked = await redis.get(lockKey); //recuperiamo da redis, se esiste già, lockKey, se c'è diamo errore
        if (isLocked) {
            return res.status(429).json({
                message: "Troppi tentativi. Riprova tra qualche minuto."
            });
        }

        const user = await User.findOne({ email }).select('+password')



        if (!user || !(await user.comparePassword(password))) {
            const attempts = await redis.incr(attemptsKey) // incr funcge da contatore ed incrementatore quindi se la pass è errata aumentiamo

            if (attempts === 1) {
                await redis.expire(attemptsKey, ATTEMPT_WINDOW) // se è il primo tentativo facciamo partire i 5 minuti entro i quali l'utente ha un max di 5 tentativi
            }

            if (attempts >= MAX_ATTEMPTS) { // se i tentativi fatti sono maggiori dei tentativi consentiti settiamo lockKey con valore positivo 1 ossia 'bloccato' (1 non è legge, poteva essere anche pippo)
                await redis.set(lockKey, 1, "EX", ATTEMPT_WINDOW);
                return res.status(429).json({
                    message: "Troppi tentativi. Account temporaneamente bloccato."
                });
            }

            return res.status(400).json({
                message: "Credenziali errate",
            });
        }

        //se è corretto il tentativo, eliminiamo i tentativi e quel blocco
        await redis.del(attemptsKey);
        await redis.del(lockKey);

        const maxOtpPerDay = 10
        const twentyfourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const otpDoc = await Otp.countDocuments({
            email,
            expiresAt: { $gte: twentyfourHoursAgo }
        })

        if (otpDoc >= maxOtpPerDay) {
            return res.status(429).json({ message: 'Hai superato il numero massimo di OTP richiedibili' })
        }

        const otp = generateOTP()
        const newOtp = new Otp({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        })

        await newOtp.save()

        try {
            sendOtpEmail(email, otp)
        } catch (err) {
            console.log(err)
        }

        return res.status(200).json({ message: 'OTP inviato alla tua email' })
    } catch (err) {
        next(err)
    }
}


export async function verifyOTP(req, res, next) {
    try {
        const { otp } = req.body
        if (!otp) {
            return res.status(400).json({ message: 'Inserisci il codice OTP' })
        }

        const otpDoc = await Otp.findOne({
            otp,
            expiresAt: { $gte: new Date() }
        })
        if (!otpDoc) {
            return res.status(404).json({ message: 'OTP scaduto o non valido' })
        }

        const user = await User.findOne({ email: otpDoc.email })
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' })
        }

        const sessionId = await createSessionId(user._id)

        res.cookie('sessionId', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 20 * 60 * 1000  /*cambio in 20 minuti*/
        })

        await Otp.deleteMany({ email: otpDoc.email })

        res.status(200).json({ message: 'Login effettuato' })

    } catch (err) {
        next(err)
    }
}


export async function sendoOTP(req, res, next) {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(404).json({ message: 'Inserire l\'email' })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(409).json({ message: 'Utente già registrato' })
        }

        const maxOtpPerDay = 10
        const twentyfourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const otpCount = await Otp.countDocuments({
            email,
            expiresAt: { $gte: twentyfourHoursAgo }
        })
        if (otpCount >= maxOtpPerDay) {
            return res.status(429).json({ message: 'Hai superato il numero massimo di OTP richiedibili, riprova tra 24 ore' })
        }

        const otp = generateOTP()
        const otpDoc = new Otp({
            otp,
            email,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        })
        await otpDoc.save()

        try {
            await sendOtpEmail(email, otp)
        } catch (err) {
            console.log(err)
        }

        res.status(200).json({ message: 'OTP inviato alla tua email' })
    } catch (err) {
        next(err)
    }
}


export async function register(req, res, next) {
    try {
        //address = {} valore di fealut nel caso in cui non venga passato
        const { name, surname, dateOfBirth, address = {}, phone, specialization, role, price, description, email, password, otp } = req.body || {}

        //destructuring nel caso in cui ci fosse
        const {
            city = '',
            postalCode = '',
            street = '',
            country = ''
        } = address

        if (!name || !otp) {
            return res.status(404).json({ message: 'name e OTP obbligatori' })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(409).json({ message: 'Utente già presente' })
        }

        const otpDoc = await Otp.findOne({
            email,
            otp,
            expiresAt: { $gte: Date.now() } //cerchiamo se c'è l'otp che soddisfa queste condizioni tra cui che la sua scadenza sia maggiore o uguale ad ora (quindi nel futuro rispetto ad ora ossia non ancora scaduto )
        })
        if (!otpDoc) {
            return res.status(404).json({ message: 'OTP scaduto o non valido' })
        }

        // se il role è corretto aggiungiamo quelle variabili destrutturate all'oggetto address cosi come per gli altri
        const newUser = new User({
            name, surname, dateOfBirth, address: role === 'dottore' ? { city, street, postalCode, country } : undefined, phone, email, role, password,
            description: role === 'dottore' ? description : undefined,
            price: role === 'dottore' ? price : undefined,
            specialization: role === 'dottore' ? specialization : undefined
        })
        await newUser.save()

        await Otp.deleteMany({ email: otpDoc.email })

        res.status(201).json({ message: 'Registrazione completata' })
    } catch (err) {
        next(err)
    }
}


export async function logout(req, res, next) {
    try {
        const session = req.cookies.sessionId

        if (session) {
            await deleteSessionId(session)
        }

        res.clearCookie('sessionId', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        })

        res.status(200).json({ message: 'Logout effettuato' })
    } catch (err) {
        next(err)
    }
}