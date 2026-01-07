import express from 'express'
import {  getDoctors, getSingleDoctor, getSpecializations } from '../controllers/doctor/doctorController.js'


const doctorRouter = express.Router()

doctorRouter.get('/getAll', getDoctors)

doctorRouter.get('/specialization/:specialization', getSpecializations)

doctorRouter.get('/details/:id', getSingleDoctor)

export default doctorRouter