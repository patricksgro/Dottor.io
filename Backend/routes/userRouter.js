import express from 'express'
import { attachUser, editAvatar, editData } from '../controllers/user/userController.js'
import { requireSession } from '../middlewares/requireSession.js'
import {sanitizeRequest} from '../middlewares/sanitizeRequest.js'
import {validateRequest} from '../middlewares/validateRequest.js'
import {updateUserSchema} from '.././validations/userValidation.js'
import uploadCloudinary from '../utils/mailer/uploadCloudinary.js'

const userRouter = express.Router()

//rotta per la connessione webSocket tra frontend e backend
userRouter.get('/webSocketConnect', requireSession, (req, res) => {
    return res.status(200).json({
        sessionId: req.cookies.sessionId
    })
})

userRouter.get('/me', attachUser)

userRouter.post('/editData', sanitizeRequest, validateRequest(updateUserSchema), editData)
userRouter.patch('/editAvatar', uploadCloudinary.single('avatar'), editAvatar)

export default userRouter