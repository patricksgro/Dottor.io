import { Col, Container, Row } from "react-bootstrap";
import DoctorHome from "../components/DoctorHome";
import PazientHome from "../components/PazientHome";
import { useAuth } from "../context/authContext";
import Sidebar from "../components/Sidebar";
import { useState } from "react";


export function Home() {

    const { user } = useAuth();

    const [collapsed, setCollapsed] = useState(false)

    return (
        <>
            <Container fluid >
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
                        }}
                    >
                        <Sidebar
                            collapsed={collapsed}
                            setCollapsed={setCollapsed} />
                    </Col>

                    <Col lg={12}>
                        {
                            user.role === 'dottore' ?
                                <DoctorHome user={user} />
                                :
                                <PazientHome />
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}
