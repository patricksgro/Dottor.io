import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleDoctor } from "../../axios/doctor"
import { Container, Card, Button, NavDropdown } from 'react-bootstrap'
import { MapPin, Calendar, Phone, Stethoscope, MessagesSquare } from "lucide-react"
import ModalConfirmReserveAndPay from "../components/modals/ModalConfirmReserveAndPay"
import ModalChat from "../components/modals/ModalChat"
import '../style/input.css'
import { useAuth } from "../context/authContext"
import { toast } from "react-toastify"

function DoctorDetails() {

    const { user } = useAuth()

    const { id } = useParams()
    const [doctorDetails, setDoctorDetails] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [showModalChat, setShowModalChat] = useState(false);

    useEffect(() => {
        const getDoctor = async () => {
            const res = await getSingleDoctor(id)
            setDoctorDetails(res)
        }
        getDoctor()
    }, [id])

    return (
        <>
            {doctorDetails &&
                <Container className="my-5">

                    {/* HERO */}
                    <Card className="border-0 shadow-sm mb-5">
                        <Card.Body className="p-4 p-md-5">

                            <div className="d-flex align-items-center gap-5 flex-wrap">

                                {/* FOTO */}
                                <img
                                    src={doctorDetails.avatar.url}
                                    alt="Doctor"
                                    width={180}
                                    height={180}
                                    style={{
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />

                                {/* IDENTITÀ */}
                                <div className="flex-grow-1">
                                    <h2 className="mb-1 fw-semibold">
                                        {doctorDetails.name} {doctorDetails.surname}
                                    </h2>

                                    <div className="text-muted mb-3">
                                        {doctorDetails.specialization}
                                        <span className="mx-2">•</span>
                                        {doctorDetails.address.city}
                                    </div>

                                    <p className="text-muted mb-4" style={{ maxWidth: "600px" }}>
                                        {doctorDetails.description}
                                    </p>

                                    {/* AZIONI */}
                                    <div className="d-flex gap-3 flex-wrap">
                                        <Button
                                            onClick={() => setShowModal(true)}
                                            className="button-color-function">
                                            <Calendar size={20} className="me-2" />
                                            Prenota una visita
                                        </Button>

                                        <Button
                                            onClick={() => {
                                                if (!user) {
                                                    toast.error('Per inviare messaggi devi prima registrarti')
                                                    return
                                                }
                                                user ?
                                                    setShowModalChat(true)
                                                    :
                                                    toast.error('Per inviare messaggi devi effettuare l\'accesso')
                                            }}
                                            className="button-color-function" variant="outline-light">
                                            <MessagesSquare size={20} className="me-2" />
                                            Invia un messaggio
                                        </Button>

                                        <Button className="button-color-function" variant="outline-light">
                                            <div className="d-flex align-items-center">
                                                <Phone size={20} className="me-2" />
                                                <NavDropdown title='Contatta'>
                                                    <NavDropdown.Item>
                                                        {doctorDetails.phone}
                                                    </NavDropdown.Item>
                                                </NavDropdown>
                                            </div>

                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </Card.Body>
                    </Card>

                    {/* CONTENUTO */}
                    <div className="row g-4">

                        {/* COLONNA SINISTRA */}
                        <div className="col-lg-7">

                            {/* BIO */}
                            <Card className="border-0 shadow-sm mb-4">
                                <Card.Body className="p-4">
                                    <h5 className="mb-3 fs-4">Profilo professionale</h5>

                                    <p className="text-muted mb-0">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Eaque animi saepe obcaecati, natus adipisci voluptatibus veniam
                                        reprehenderit fugiat eius cupiditate.
                                        Approccio basato sull’ascolto del paziente e sull’evidenza clinica.
                                    </p>

                                    <p className="mb-0 mt-2">
                                        <span className="fs-5">Prezzo visite: € {doctorDetails.price}</span>
                                    </p>
                                </Card.Body>
                            </Card>

                            {/* AREE */}
                            <Card className="border-0 shadow-sm">
                                <Card.Body className="p-4">
                                    <h5 className="mb-3 fs-4">Aree di competenza</h5>

                                    <ul className="mb-0 text-muted">
                                        <li>Area specialistica 1</li>
                                        <li>Area specialistica 2</li>
                                        <li>Area specialistica 3</li>
                                        <li>Area specialistica 4</li>
                                    </ul>
                                </Card.Body>
                            </Card>

                            {/* CONTATTI */}
                            <Card className="border-0 shadow-sm mt-4">
                                <Card.Body className="p-4">
                                    <h5 className="mb-3 fs-4">Contatti</h5>

                                    <p className="mb-2">
                                        <strong>Telefono</strong><br />
                                        {doctorDetails.phone}
                                    </p>

                                    <p className="mb-2">
                                        <strong>Email</strong><br />
                                        {doctorDetails.email}
                                    </p>

                                    <p className="mb-0">
                                        <strong>Indirizzo</strong><br />
                                        {doctorDetails.address.street}, {doctorDetails.address.postalCode}, {doctorDetails.address.city}, {doctorDetails.address.country}
                                    </p>
                                </Card.Body>
                            </Card>

                        </div>

                        {/* COLONNA DESTRA */}
                        <div className="col-lg-5">

                            <Card className="border-0 shadow-sm mb-4">
                                <Card.Body className="p-4">
                                    <h5 className="mb-3 fs-4">Dove è la sede</h5>
                                </Card.Body>
                            </Card>

                            {/* MAPPA */}
                            <Card className="border-0 shadow-sm">
                                <iframe
                                    width="600"
                                    height="400"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_API_KEY_MAP}&q=${encodeURIComponent(
                                        doctorDetails.address.street + ', ' + doctorDetails.address.city
                                    )}`}
                                ></iframe>
                            </Card>
                        </div>

                    </div>

                </Container>
            }

            {
                showModal && (
                    <ModalConfirmReserveAndPay
                        onHide={() => setShowModal(false)}
                        doctor={doctorDetails} />
                )
            }

            {
                showModalChat && (
                    <ModalChat
                        onHide={() => setShowModalChat(false)}
                        doctor={doctorDetails} />
                )
            }
        </>
    )
}

export default DoctorDetails