import express from 'express'
import { login, logout, register, sendoOTP, verifyOTP } from '../controllers/auth/authController.js'
import { sanitizeRequest } from '../middlewares/sanitizeRequest.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { createUserSchema } from '../validations/userValidation.js'
import ipLimiter from '../middlewares/rate-limiterLogin.js'

const authRouter = express.Router()

authRouter.post('/login', ipLimiter, login)
authRouter.post('/verify-otp', ipLimiter, verifyOTP)

//KEEP-ALIVE ELIMINATO, LA SESSIONE SCADE DOPO 5 MINUTI DI INATTIVITà DELL'UTENTE

authRouter.post('/send-otp', ipLimiter, sendoOTP)
authRouter.post('/register', ipLimiter, sanitizeRequest, validateRequest(createUserSchema), register)

authRouter.post('/logout', logout)


export default authRouter