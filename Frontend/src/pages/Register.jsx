import { useState } from "react"
import { Link } from 'react-router-dom'
import { Button, Form } from "react-bootstrap"
import { Stethoscope, User2Icon } from "lucide-react"
import { ShieldCheck, CalendarCheck, ArrowRight } from "lucide-react";
import '../style/input.css'
import RegisterPazient from "../components/RegisterPazient"
import RegisterDoctor from "../components/RegisterDoctor"

function Register() {

    const [step, setStep] = useState(1)
    const [role, setRole] = useState(null)

    return (
        <>
            <div className='d-flex justify-content-center align-items-center' style={{ marginTop: '10%' }}>
                <div
                    className="p-5 d-flex justify-content-center ">
                    <div
                        style={{
                            width: "450px",
                            padding: "30px",
                            borderRadius: "20px",
                            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                            background: "white",
                        }}
                    >
                        <div className="text-center mb-4">
                            <h1 style={{ fontWeight: "700" }}>Crea il tuo account</h1>
                            <p style={{ color: "#6c757d", marginTop: "-5px" }}>
                                NOTA: I campi contrasseganti dal simbolo '*' sono obbligatori
                            </p>
                        </div>
                        {
                            step === 1 &&
                            <Form>
                                <Form.Label className="fw-semibold mb-2 fs-5">
                                    Indica il tuo ruolo*
                                </Form.Label>
                                <Form.Group className="mb-3" >
                                    <div className="d-flex align-items-center gap-2">
                                        <User2Icon />
                                        <Form.Check
                                            className="my-4"
                                            type="radio"
                                            label="Paziente"
                                            name="role"              // 🔑 stesso name
                                            value="paziente"
                                            checked={role === "paziente"}
                                            onChange={(e) => setRole(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="d-flex align-items-center gap-2">
                                        <Stethoscope />
                                        <Form.Check
                                            type="radio"
                                            label="Dottore"
                                            name="role"              // 🔑 stesso name
                                            value="dottore"
                                            required
                                            checked={role === "dottore"}
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>

                                <Button onClick={() => {
                                    if (role === 'paziente') {
                                        setRole('paziente')
                                        setStep(2);
                                    } else if (role === 'dottore') {
                                        setRole('dottore')
                                        setStep(2);
                                    } else {
                                        return
                                    }
                                }}
                                    className="button-color my-2">
                                    Avanti
                                </Button>
                            </Form>

                        }


                        {
                            role === 'paziente' ?
                                <RegisterPazient
                                    step={step}
                                    setStep={setStep}
                                    role={role}
                                />
                                :
                                role === 'dottore' ?
                                    <RegisterDoctor
                                        step={step}
                                        setStep={setStep}
                                        role={role}
                                    />
                                    :
                                    null
                        }

                    </div>
                </div>

                <div
                    className="position-relative p-5"
                    style={{
                        borderRadius: "10%",
                        overflow: "hidden",
                        backgroundColor: "white",
                    }}
                >
                    {/* BACKGROUND DIAGONALE */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "72%",
                            background: "linear-gradient(135deg, #39CCCC, #2BB0B0)",
                            clipPath: "polygon(0 0, 100% 0, 100% 79%, 0 100%)",
                            zIndex: 0,
                        }}
                    />

                    {/* CONTENUTO */}
                    <div style={{ position: "relative", zIndex: 1, maxWidth: "380px" }}>
                        {/* PARTE ALTA (testo bianco) */}
                        <h2 style={{ marginBottom: "16px", color: "white" }}>
                            La tua salute, a portata di click
                        </h2>

                        <p style={{ fontSize: "16px", color: "white" }}>
                            Accedi alla piattaforma e prenota visite mediche in modo semplice
                            e sicuro, con professionisti qualificati in tutta Italia.
                        </p>

                        <div className="mt-4">
                            <div className="d-flex align-items-start mb-3" style={{ color: "white" }}>
                                <Stethoscope size={22} style={{ marginRight: "12px" }} />
                                <span>Oltre <strong>100.000 specialisti certificati</strong></span>
                            </div>

                            <div className="d-flex align-items-start mb-3" style={{ color: "white" }}>
                                <CalendarCheck size={22} style={{ marginRight: "12px" }} />
                                <span>Prenota visite in pochi minuti, senza attese</span>
                            </div>

                            <div className="d-flex align-items-start mb-4" style={{ color: "white" }}>
                                <ShieldCheck size={22} style={{ marginRight: "12px" }} />
                                <span>Dati personali protetti e massima sicurezza</span>
                            </div>
                        </div>

                        {/* PARTE BASSA (bianca) */}
                        <div className="text-center pt-4">
                            <h2 style={{ fontWeight: "600", color: "#333" }}>
                                Hai già un account?
                            </h2    >
                            <p style={{ color: "#6c757d", fontSize: "14px" }}>
                                Accedi e naviga
                            </p>

                            {/* BOTTONE PREMIUM */}
                            <Link
                                to='/login'
                                className="d-flex align-items-center justify-content-center mx-auto mt-3"
                                style={{
                                    textDecoration: 'none',
                                    background: "linear-gradient(135deg, #39CCCC, #2BB0B0)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "14px",
                                    padding: "12px 22px",
                                    fontSize: "18px",
                                    boxShadow: "0 8px 20px rgba(43,176,176,0.35)",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    width: '140px'
                                }}
                            >
                                Accedi
                                <ArrowRight size={18} style={{ marginLeft: "8px" }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register