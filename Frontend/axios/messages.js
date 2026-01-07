import instance from "./axios";

export async function getMessages(dottorId) {
    try {
        const res = await instance.get(`/messages/${dottorId}`)
        return res.data
    } catch (err) {
        return Promise.reject(err)
    }
}

//lista utenti con ultimo messaggio
export async function getChatList() {
    try {
        const res = await instance.get(`/messages/chatList`)
        return res.data
    } catch (err) {
        return Promise.reject(err)
    }
}