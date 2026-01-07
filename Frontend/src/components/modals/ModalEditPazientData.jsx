import { useEffect, useState } from "react"
import { edit } from "../../../axios/user.js"
import { useAuth } from '../../context/authContext.jsx'
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import {
    User,
    Calendar,
    Phone,
    Stethoscope,
    Euro,
    Mail,
    Info,
    MapPin,
    Building2,
    Globe,
    Save
} from "lucide-react"

function ModalEditData({ onHide }) {

    const { user } = useAuth()

    console.log(user)

    const role = user.role

    useEffect(() => {
        setData({
            name: user.name,
            surname: user.surname,
            role: role,
            email: user.email
        })
    }, [])

    const [data, setData] = useState({
        name: '',
        surname: '',
        dateOfBirth: '',
        role: role,
        email: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setData({
            ...data,
            [name]: value
        })
    }

    const editData = async () => {
        try {
            const res = await edit(data)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Modal show={true} onHide={onHide} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="d-flex align-items-center gap-2">
                        <User size={20} />
                        Modifica dati
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>

                        {/* DATI PERSONALI */}
                        <h5 className="mb-3 text-primary">Dati personali</h5>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex align-items-center gap-2">
                                        <User size={16} /> Nome
                                    </Form.Label>
                                    <Form.Control
                                        name="name"
                                        onChange={handleChange}
                                        value={data.name}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex align-items-center gap-2">
                                        <User size={16} /> Cognome
                                    </Form.Label>
                                    <Form.Control
                                        name="surname"
                                        onChange={handleChange}
                                        value={data.surname}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex align-items-center gap-2">
                                        <Calendar size={16} /> Data di nascita
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dateOfBirth"
                                        onChange={handleChange}
                                        value={data.dateOfBirth}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label className="d-flex align-items-center gap-2">
                                <Mail size={16} /> Email
                            </Form.Label>
                            <Form.Control
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        style={{ backgroundColor: '#39CCCC', border: 'none' }}
                        size="lg" onClick={() => {
                            editData()
                            onHide()
                        }}>
                        <Save size={18} className="me-2" />
                        Salva modifiche
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditData