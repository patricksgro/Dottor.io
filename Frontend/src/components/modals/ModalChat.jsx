import { Button, Modal } from "react-bootstrap"
import { socketConnect } from '../../../socket.js'
import { useState } from "react"
import { useEffect } from "react"
import { getMessages } from "../../../axios/messages.js"
import { useAuth } from '../../context/authContext.jsx'

function ModalChat({ onHide, doctor }) {

    //questo è stringa da console.log()
    console.log(doctor._id)

    const { user } = useAuth()

    // ✅ 1. CONTROLLA DOCTOR ESISTE
    if (!doctor) {
        return null
    }

    const [text, setText] = useState('')
    const [socketState, setSocketState] = useState(null)
    const [messages, setMessages] = useState(null)

    useEffect(() => {
        let socket;  // ← variabile locale

        const testConncetionSocket = async () => {
            socket = await socketConnect()  // ← salva qui
            setSocketState(socket)           // ← E qui

            //qui riceviamo i mess perche devono essere sempre aggiionrati e richiamiamo il vecchio valore altriemnti il valore rimane congelato e il nuovo sorascrive il vecchio
            socket.on('receive_message', (newMessage) => {
                //errato poiche sovrascrive  il valore
                // setMessages([...messages, newMessage])

                // corretto poiche aggiunge il valore nuovo a quello vechhio
                setMessages(prevMessages => [...prevMessages, newMessage])
            })
        }
        testConncetionSocket()

        //il return dentro un useEffect viene eseguito quando il componente si smonta
        return () => {
            // Ora puoi usare socket qui!
            if (socket) {
                socket.off('receive_message')
                socket.disconnect()
            }
        }
    }, [])

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await getMessages(doctor._id)
            setMessages(res)
            console.log(res)
        }

        fetchMessages()
    }, [])

    const handleSendMessage = async () => {
        const msgData = {
            receiverId: doctor._id,
            text: text
        }

        console.log(msgData)
        socketState && socketState.emit('send_message', msgData)

        setText('')
    }


    return (
        <Modal show={true} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Chat con {doctor.name} {doctor.surname}</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    maxHeight: '60vh',
                    overflowY: 'auto'
                }}>
                {messages &&
                    messages.map(message => {
                        const isMyMessage = String(message.senderId._id) === String(user._id)
                        return !isMyMessage
                            ? <div
                                key={message._id}
                                className="my-4"
                                style={{
                                    maxWidth: '70%',
                                    marginRight: 'auto',
                                    padding: '10px 14px',
                                    borderRadius: '12px 12px 12px 0',
                                    backgroundColor: '#ffffff',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                                }}
                            >
                                <p className="p-0 m-0 text-start fw-bold">{message.senderId.name} {message.senderId.surname}</p>
                                <p className="p-0 m-0 text-start">{message.text}</p>
                                <p className="p-0 m-0 text-end text-muted">{new Date(message.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</p>
                            </div>
                            : <div
                                key={message._id}
                                className="my-4"
                                style={{
                                    maxWidth: '70%',
                                    marginLeft: 'auto',
                                    padding: '10px 14px',
                                    borderRadius: '12px 12px 0 12px',
                                    backgroundColor: '#dcf8c6',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                                }}
                            >
                                <p className="p-0 m-0 text-end fw-bold">Tu</p>
                                <p className="p-0 m-0 text-end">{message.text}</p>
                                <p className="p-0 m-0 text-start text-muted">{new Date(message.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</p>
                            </div>
                    })
                }
            </Modal.Body>
            <Modal.Footer>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {
                    socketState &&
                    <Button
                        onClick={handleSendMessage}
                    >
                        Invia
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default ModalChat