import { validatorMessageJOI } from "../validations/messagesValidations.js"
import { SendMessageService } from '../services/SendMessageService.js'
import { Messages } from "../models/Messages.js"

//questa funzione viene traformata in webSocket e non con req,res,next perche non siamo piu nel protocollo http,nonavremo params ecc , tutto arriverà da emit in frontend
export async function sendMessageController(socket, data) {
    //Validiamo con JOI ed otteniamo una risposta
    await validatorMessageJOI(data)

    //questa la mettiamo in services, funge da controllo backend, come le funzioni dei controller, la mettiamo altrove poichè trattandosi di webSocket ed essendo diversa la gestiamo diversamente
    //mi restituisce, dopo i dovuti controlli, un oggetto messaggio con i dati di esso, che userò per mandare al dest con emit
    const message = await SendMessageService({
        senderId: socket.userId,
        receiverId: data.receiverId,
        text: data.text
    })

    //se ok, emit
    //inviamo di fatti il mes al dest (deve essere un oggetto)
    socket.to(message.receiverId).emit('receive_message', {
        senderId: message.senderId,
        receiverId: message.receiverId,
        text: message.text,
        createdAt: message.createdAt
    })

}


//messaggi con utente specifico
export async function getMessages(req, res, next) {
    try {
        const userId = req.user.id
        const { dottorId } = req.params

        const messages = await Messages.find({
            $or: [
                { senderId: userId, receiverId: dottorId },  // ← Oggetto 1
                { senderId: dottorId, receiverId: userId }   // ← Oggetto 2
            ]
        }).sort({ createdAt: 1 })
            .populate('senderId', 'name surname')

        return res.status(200).json(messages)
    } catch (err) {
        next(err)
    }
}



//chat list di utenti
export async function chatList(req, res, next) {
    try {
        const loggedUser = req.user.id

        //verfifichiamo se l'utente esiste, quindi è stato generato un messaggio in cui l'utente loggato invia o riceve
        const messagges = await Messages.find({
            $or: [
                { senderId: loggedUser },
                { receiverId: loggedUser }
            ]
        }).populate('senderId receiverId', 'name surname')


        if (messagges.length > 0) {
            let conversationsMap = {}

            //con il ciclo verifichiamo se per gli altri utenti abbiamo gia una convrsazione con l'utente loggato
            messagges.forEach((message) => {

                let otherUser;

                String(loggedUser) === String(message.receiverId._id) ? otherUser = message.senderId._id : otherUser = message.receiverId._id

                if (!conversationsMap[otherUser]) {
                    conversationsMap[otherUser] = message
                } else {
                    if (message.createdAt > conversationsMap[otherUser].createdAt) {
                        conversationsMap[otherUser] = message
                    }
                }

            })

            //conversione in array e ordinamento
            const chatList = []

            for (let otherUser in conversationsMap) {
                const message = conversationsMap[otherUser]
                chatList.push(message)
            }

            chatList.sort((a, b) => b.createdAt - a.createdAt)

            res.status(200).json(chatList)
        }

        return

    } catch (err) {
        next(err)
    }
}