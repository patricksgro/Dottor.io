import { io } from 'socket.io-client'
import instance from './axios/axios'

//stabiliamo la connessione con il nostro backend
//finchè stiamo in locale inseriamo localhost
//sessionId deve rapprenstare esattamente ciò che creiamo al momento della login, in login facciamo redis.set(session:`${sessionId}`)
//però dobbiamo prima aere accesso alla sessione perche poi deve essere passata al backend per la connesione vera e propria

//socket è l'oggetto, l'intera line di comunicazione ma nel backend mandiamo solo sessionId, il backend la validaerà e metterà anche userId in socket

export const socketConnect = async () => {

    const res = await instance.get('/user/webSocketConnect')

    if (res) {
        const socket = io("http://localhost:3000", {
            withCredentials: true,
            auth: {
                sessionId: res.data.sessionId
            }
        });
        return socket
        
    }

}
