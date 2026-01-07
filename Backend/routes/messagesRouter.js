import express from 'express'
import { chatList, getMessages } from '../controllers/messages.js'

const messagesRouter = express.Router()

messagesRouter.get('/chatList', chatList)

messagesRouter.get('/:dottorId', getMessages)

export default messagesRouter