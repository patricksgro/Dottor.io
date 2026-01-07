import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import '../style/link.css';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import ModalEditDoctorData from './modals/ModalEditDoctorData';
import { editAvatar } from '../../axios/user';


function DoctorHome({ user }) {

    const [showModalEditData, setShowModalEditData] = useState(false)

    const split = user.name.split('');
    const firstLetter = split.slice(0, 1);

    return (
        <>
            <Container >
                <div className='my-5'>
                    <div className='d-flex justify-content-end'>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                            <div
                                className='fs-2'
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    backgroundColor: "#39CCCC",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontWeight: "600",
                                    fontSize: "1.2rem",
                                    textTransform: "uppercase",
                                }}
                            >
                                {firstLetter}
                            </div>

                            <p className="fs-2 mb-0">
                                {user.name} {user.surname}
                            </p>
                        </div>
                    </div>
                </div>

                <Row>
                    <Col lg={4}>
                        <div>
                            <img
                                src={user.avatar.url}
                                alt="avatar"
                                width={360}
                                height={360}
                                style={{
                                    borderRadius: "50%",
                                    border: "6px solid #39CCCC",
                                    objectFit: "cover",
                                }}
                            />
                        </div>

                        <Card className="border-0 shadow-sm mt-4">
                            <Card.Body>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <span className="fs-3 fw-semibold">Dettagli</span>
                                    </div>

                                    <Button
                                        onClick={() => setShowModalEditData(true)}
                                        style={{ backgroundColor: 'transparent', border: 'none' }}>
                                        <Pencil style={{ color: '#39CCCC' }} />
                                    </Button>
                                </div>

                                <div className="mt-3">
                                    <p className="mb-1 fs-5"><strong>Nome:</strong> {user.name} {user.surname}</p>
                                    <p className="mb-1 fs-5"><strong>Specializzazione:</strong> {user.specialization}</p>
                                    <p className="mb-1 fs-5"><strong>Prezzo visite:</strong> €{user.price}</p>
                                    <p className="mb-1 fs-5"><strong>Telefono:</strong> {user.phone}</p>
                                    <p className="mb-1 fs-5"><strong>Email:</strong> {user.email}</p>
                                    <p className="mb-0 fs-5"><strong>Studio:</strong> {user.address.street}, {user.address.postalCode}, {user.address.city}</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={8}>

                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Body className="p-4">
                                <h5 className="mb-3 fs-4">Dove è la sede</h5>
                            </Card.Body>
                        </Card>

                        <Card className="border-0 shadow-sm">
                            <iframe
                                style={{ border: 0, maxHeight: '700px', maxWidth: '900px', minHeight: '450px', minWidth: '330px' }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_API_KEY_MAP}&q=${encodeURIComponent(
                                    user.address.street + ', ' + user.address.city
                                )}`}
                            ></iframe>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {
                showModalEditData &&
                <ModalEditDoctorData
                    onHide={() => setShowModalEditData(false)} />
            }
        </>
    )
}

export default DoctorHome