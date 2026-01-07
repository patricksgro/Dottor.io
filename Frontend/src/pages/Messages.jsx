import { useEffect } from "react"
import { getChatList } from "../../axios/messages"
import { useState } from "react"
import { User } from "lucide-react"
import { Col, Container, Row } from 'react-bootstrap'
import Sidebar from '../components/Sidebar.jsx'
import { useAuth } from "../context/authContext.jsx"
import ModalChat from "../components/modals/ModalChat.jsx"

function Messages() {

    const { user } = useAuth()

    const [messages, setMessages] = useState(null)

    const [collapsed, setCollapsed] = useState(false)
    const [showModalChat, setShowModalChat] = useState(false)
    const [theOtherUser, setTheOtherUser] = useState(null)

    useEffect(() => {
        const list = async () => {
            const res = await getChatList()
            setMessages(res)
        }
        list()
    }, [])

    return (
        <>
            <Container className="my-5">
                <Row>
                    <Col

                        style={{
                            width: collapsed ? "80px" : "250px",
                            transition: "width 0.3s ease",
                            position: "fixed",
                            left: 0,
                            top: 0,
                            height: "100vh",
                            padding: 0,
                            marginTop: '3%',
                            zIndex: 1000,
                        }}>
                        <Sidebar
                            collapsed={collapsed}
                            setCollapsed={setCollapsed} />
                    </Col>

                    <Col lg={4}>
                        <div className="p-3 d-flex flex-column gap-4">
                            {messages &&
                                messages.map(message => {
                                    let otherUser;
                                    String(message.senderId._id) === String(user._id)
                                        ? otherUser = message.receiverId
                                        : otherUser = message.senderId
                                    console.log(otherUser)

                                    return (
                                        < div
                                            onClick={() => {
                                                setShowModalChat(true);
                                                setTheOtherUser(otherUser)
                                            }}
                                            key={message._id}
                                            className="p-3 rounded-4 shadow-sm border"
                                            style={{
                                                background: 'linear-gradient(135deg, #ffffff, #f9fbfc)',
                                                cursor: 'pointer'
                                            }
                                            }
                                        >
                                            {/* Header */}
                                            < div className="d-flex align-items-center gap-3" >
                                                {/* Avatar */}
                                                < div
                                                    className="d-flex align-items-center justify-content-center shadow-sm"
                                                    style={{
                                                        background: 'linear-gradient(135deg, #39CCCC, #2bb3b3)',
                                                        borderRadius: '50%',
                                                        width: '52px',
                                                        height: '52px',
                                                        flexShrink: 0
                                                    }}
                                                >
                                                    <User size={32} color="white" />
                                                </div>

                                                {/* Contenuto */}
                                                <div
                                                    className="flex-grow-1">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="m-0 fw-semibold text-dark">
                                                            {otherUser.name} {otherUser.surname}
                                                        </p>
                                                        <small className="text-muted">
                                                            {new Date(message.createdAt).toLocaleTimeString()}
                                                        </small>
                                                    </div>

                                                    {/* Messaggio */}
                                                    <p
                                                        className="m-0 mt-1 text-secondary"
                                                        style={{ lineHeight: '1.4' }}
                                                    >
                                                        {message.text.slice(0, 75)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </Col >

                    <Col lg={8}
                    >
                        <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                            <div className="text-center">
                                <User size={64} />
                                <p className="mt-3 fs-5">
                                    Seleziona una chat per iniziare a conversare
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row >

                {
                    showModalChat && (
                        <ModalChat
                            onHide={() => setShowModalChat(false)}
                            doctor={theOtherUser} />
                    )
                }
            </Container >
        </>
    )
}

export default Messages