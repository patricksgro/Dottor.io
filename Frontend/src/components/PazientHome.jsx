import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import {
    User,
    Mail,
    Calendar,
    Edit3,
    HeartPulse,
    Clock
} from "lucide-react";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import ModalEditPazientData from "./modals/ModalEditPazientData";
import { Link } from "react-router-dom";

function PazientHome() {

    const [showModal, setShowModal] = useState(false)

    const { user } = useAuth()
    console.log(user)

    return (
        <>
            <Container className="py-4">

                {/* HEADER PROFILO */}
                <Card className="mb-4 shadow-sm border-0">
                    <Card.Body className="d-flex align-items-center gap-4">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                            <User size={32} className="text-primary" />
                        </div>

                        <div className="flex-grow-1">
                            <h4 className="mb-0">{user.name} {user.surname}</h4>
                            <small className="text-muted">Paziente</small>
                        </div>

                        <Button
                            onClick={() => setShowModal(true)}
                            variant="outline-primary">
                            <Edit3 size={16} className="me-2" />
                            Modifica profilo
                        </Button>
                    </Card.Body>
                </Card>

                <Row className="g-4">

                    {/* DATI PERSONALI */}
                    <Col lg={8}>
                        <Card className="shadow-sm border-0">
                            <Card.Header className="bg-white fw-semibold d-flex align-items-center gap-2">
                                <User size={18} />
                                Dati personali
                            </Card.Header>

                            <Card.Body>
                                <Form>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control value={user.name} disabled />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Cognome</Form.Label>
                                                <Form.Control value={user.surname} disabled />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="d-flex align-items-center gap-2">
                                                    <Mail size={16} /> Email
                                                </Form.Label>
                                                <Form.Control value={user.email} disabled />
                                            </Form.Group>
                                        </Col>


                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="d-flex align-items-center gap-2">
                                            <Calendar size={16} /> Data di nascita
                                        </Form.Label>
                                        <Form.Control value={new Date(user.dateOfBirth).toLocaleDateString()} disabled />
                                    </Form.Group>

                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* RIEPILOGO APPUNTAMENTI */}
                    <Col lg={4}>
                        <Card className="shadow-sm border-0 h-100">
                            <Card.Header className="bg-white fw-semibold d-flex align-items-center gap-2">
                                <Clock size={18} />
                                Appuntamenti
                            </Card.Header>

                            <Card.Body>
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <strong>Visite prenotate</strong>
                                    </div>

                                    <Button style={{ backgroundColor: '#39CCCC', border: 'none' }}>
                                        Consulta elenco visite prenotate
                                    </Button>
                                </div>

                                <hr />

                                <div className="text-muted small">
                                    Totale appuntamenti prenotati: <strong>0</strong>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

                {/* SEZIONE EXTRA */}
                <Card className="mt-4 shadow-sm border-0">
                    <Card.Body className="d-flex align-items-center gap-3">
                        <HeartPulse size={24} className="text-danger" />
                        <div >
                            <div className="mb-2">
                                <strong>Stato del profilo</strong>
                            </div>

                            <Link
                                to='/messages'>
                                Vai ai messaggi
                            </Link>
                        </div>
                    </Card.Body>
                </Card>

            </Container>

            {
                showModal &&
                <ModalEditPazientData
                    onHide={() => setShowModal(false)} />
            }
        </>
    );
}

export default PazientHome;
