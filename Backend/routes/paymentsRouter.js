import express from 'express'
import { createCheckoutSession } from '../controllers/payment/checkoutController.js'

const paymentsRouter = express.Router()

paymentsRouter.post('/checkout', createCheckoutSession)

export default paymentsRouter