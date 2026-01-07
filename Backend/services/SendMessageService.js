import User from '../models/Users.js'
import {Messages} from '../models/Messages.js'

export async function SendMessageService({receiverId, senderId, text}) {
    try {
        const user = await User.findById(receiverId)
        if(!user) {
            throw new Error('Destinatario non trovato')
        }

        if(!text) {
            throw new Error('Il messaggio non può essere vuoto')
        }

        if(senderId === receiverId) {
            throw new Error('Non puoi mandare messaggi a te stesso')
        }

        const newMessage = new Messages({
            senderId,
            receiverId,
            text
        })

        await newMessage.save()

        return newMessage;

    } catch(err) {
        console.log(err)
        throw new Error('Errore nel service')
    }
}