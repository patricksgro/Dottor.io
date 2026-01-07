import { useEffect, useState } from "react"
import { edit, editAvatar } from "../../../axios/user.js"
import { useAuth } from '../../context/authContext.jsx'
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { User, Calendar, Phone, Stethoscope, Euro, Mail, Info, MapPin, Building2, Globe, Save } from "lucide-react"

function ModalEditData({ onHide }) {

    const { user } = useAuth()

    console.log(user)

    const role = user.role

    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        setData({
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            price: user.price,
            role: role,
            description: user.description,
            specialization: user.specialization,
            email: user.email,
            address: {
                street: user.address.street,
                city: user.address.city,
                postalCode: user.address.postalCode,
                country: user.address.country
            }
        })
    }, [])

    const [data, setData] = useState({
        name: '',
        surname: '',
        dateOfBirth: '',
        phone: '',
        price: '',
        role: role,
        description: '',
        specialization: '',
        email: '',
        address: {
            street: '',
            city: '',
            postalCode: '',
            country: ''
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name.startsWith('address.')) {
            const field = name.split('.')[1]

            setData({
                ...data,
                address: {
                    ...data.address,
                    [field]: value
                }
            })
            return
        }

        setData({
            ...data,
            [name]: value
        })
    }

    const editData = async () => {
        try {
            const res = await edit(data)
            await editAvatar(avatar)
        } catch (err) {
            console.log(err)
        }
    }

    // const editDoctorAvatar = async () => {
    //     try {
    //         await editAvatar(avatar)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

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
                                        <Phone size={16} /> Immagine
                                    </Form.Label>
                                    <Form.Control
                                        name="avatar"
                                        type="file"
                                        onChange={(e) => setAvatar(e.target.files[0])}
                                    />
                                </Form.Group>
                            </Col>

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

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex align-items-center gap-2">
                                        <Phone size={16} /> Cellulare
                                    </Form.Label>
                                    <Form.Control
                                        name="phone"
                                        onChange={handleChange}
                                        value={data.phone}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <hr />

                        {/* DATI PROFESSIONALI */}
                        <h5 className="mb-3 text-primary">Dati professionali</h5>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex align-items-center gap-2">
                                        <Stethoscope size={16} /> Specializzazione
                                    </Form.Label>
                                    <Form.Control
                                        name="specialization"
                                        onChange={handleChange}
                                        value={data.specialization}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex align-items-center gap-2">
                                        <Euro size={16} /> Prezzo visite
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        onChange={handleChange}
                                        value={data.price}
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

                        <Form.Group className="mb-3">
                            <Form.Label className="d-flex align-items-center gap-2">
                                <Info size={16} /> Descrizione
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                onChange={handleChange}
                                value={data.description}
                            />
                        </Form.Group>

                        <hr />

                        {/* SEDE */}
                        <h5 className="mb-3 text-primary">Sede</h5>

                        <Form.Group className="mb-3">
                            <Form.Label className="d-flex align-items-center gap-2">
                                <MapPin size={16} /> Via
                            </Form.Label>
                            <Form.Control
                                name="address.street"
                                onChange={handleChange}
                                value={data.address.street}
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex align-items-center gap-2">
                                        <Building2 size={16} /> Città
                                    </Form.Label>
                                    <Form.Control
                                        name="address.city"
                                        onChange={handleChange}
                                        value={data.address.city}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>CAP</Form.Label>
                                    <Form.Control
                                        name="address.postalCode"
                                        onChange={handleChange}
                                        value={data.address.postalCode}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex align-items-center gap-2">
                                        <Globe size={16} /> Paese
                                    </Form.Label>
                                    <Form.Control
                                        name="address.country"
                                        onChange={handleChange}
                                        value={data.address.country}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        style={{ backgroundColor: '#39CCCC', border: 'none' }}
                        size="lg" onClick={() => {
                            // if(avatar !== null) {
                            //     editDoctorAvatar()
                            // }
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