import express from 'express'
import { bookAppointment } from '../controllers/booking/booking.js'

const bookingRouter = express.Router()

bookingRouter.post('/bookingVisit/:doctorId', bookAppointment)

export default bookingRouter