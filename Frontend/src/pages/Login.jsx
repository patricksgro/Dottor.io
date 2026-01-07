import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { sendOTP, verifyOTP } from '../../axios/auth.js'
import { useAuth } from '../context/authContext.jsx'
import { Mail, Lock, KeyRound, Stethoscope, ShieldCheck, CalendarCheck, ArrowRight } from "lucide-react";
import '../style/input.css'
import { Link } from 'react-router-dom';


function Login() {

    const { loginSuccess } = useAuth()

    const [errorNoCredentials, setErrorNoCredentials] = useState(false)
    const [errorInvalidCredentials, setErrorInvalidCredentials] = useState(false)
    const [errorOTP, setErrorOTP] = useState(false)

    //STEP LOGIN - CREDENTRIALS - OTP
    const [step, setStep] = useState(1)

    //VERIFY EMAIL E PASSWORD E SEND OTP
    const [userData, setUSerData] = useState({
        email: '',
        password: ''
    })

    const handleChangeUserData = (e) => {
        setUSerData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const sendEmailOTP = async () => {
        try {
            if (userData.email === '' || userData.password === '') {
                setErrorInvalidCredentials(false)
                setErrorNoCredentials(true)
                return
            }
            await sendOTP(userData)
            setStep(2)
        } catch (err) {
            err.request.response &&
                setErrorNoCredentials(false)
            setErrorInvalidCredentials(true)
        }
    }

    //VERIFY OTP E LOGIN TO HOME PAGE
    const [otpData, setOtpData] = useState({
        otp: ''
    })

    const handleChangeotpData = (e) => {
        setOtpData({
            ...otpData,
            [e.target.name]: e.target.value
        })
    }

    const verifyUserOTP = async () => {
        try {
            await verifyOTP(otpData)
            await loginSuccess()
        } catch (err) {
            err && setErrorOTP(true)
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center' style={{ marginTop: '10%' }}>
            <div className="p-5 d-flex justify-content-center ">
                <div
                    style={{
                        width: "380px",
                        padding: "30px",
                        borderRadius: "20px",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                        background: "white",
                    }}
                >
                    <div className="text-center mb-4">
                        <h1 style={{ fontWeight: "700" }}>Login</h1>
                        <p style={{ color: "#6c757d", marginTop: "-5px" }}>
                            Accedi al tuo account
                        </p>
                    </div>

                    {step === 1 && (
                        <Form>
                            {/* EMAIL */}
                            <Form.Group className="mb-4 position-relative">
                                <Form.Label>Email</Form.Label>

                                <Mail
                                    size={18}
                                    style={{
                                        position: "absolute",
                                        left: "12px",
                                        top: "72%",
                                        transform: "translateY(-50%)",
                                        color: "#6c757d",
                                    }}
                                />

                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChangeUserData}
                                    required
                                    placeholder="name@example.com"
                                    style={{
                                        paddingLeft: "40px",
                                        borderRadius: "12px",
                                        height: "45px",
                                    }}
                                />
                            </Form.Group>

                            {/* PASSWORD */}
                            <Form.Group className="mb-4 position-relative">
                                <Form.Label>Password</Form.Label>

                                <Lock
                                    size={18}
                                    style={{
                                        position: "absolute",
                                        left: "12px",
                                        top: "72%",
                                        transform: "translateY(-50%)",
                                        color: "#6c757d",
                                    }}
                                />

                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChangeUserData}
                                    required
                                    style={{
                                        paddingLeft: "40px",
                                        borderRadius: "12px",
                                        height: "45px",
                                    }}
                                />
                            </Form.Group>

                            {
                                errorNoCredentials ?
                                    <div>
                                        <p className='text-danger text-center'>Inserire email e password</p>
                                    </div>
                                    :
                                    errorInvalidCredentials &&
                                    <div>
                                        <p className='text-danger text-center'>Credenziali errate</p>
                                    </div>

                            }

                            <Button
                                onClick={sendEmailOTP}
                                className="w-100 button-color-function"
                                style={{
                                    height: "45px",
                                    borderRadius: "12px",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                }}
                            >
                                Invia codice OTP
                            </Button>
                        </Form>
                    )}

                    {step === 2 && (
                        <Form>
                            {/* OTP */}
                            <Form.Group className="mb-4 position-relative">
                                <Form.Label>Conferma OTP</Form.Label>

                                <KeyRound
                                    size={18}
                                    style={{
                                        position: "absolute",
                                        left: "12px",
                                        top: "72%",
                                        transform: "translateY(-50%)",
                                        color: "#6c757d",
                                    }}
                                />

                                <Form.Control
                                    type="text"
                                    name="otp"
                                    value={otpData.otp}
                                    onChange={handleChangeotpData}
                                    placeholder="Enter your OTP"
                                    style={{
                                        paddingLeft: "40px",
                                        borderRadius: "12px",
                                        height: "45px",
                                    }}
                                />
                            </Form.Group>

                            {errorOTP &&
                                <div>
                                    <p className='text-danger text-center'>OTP scaduto o non valido</p>
                                </div>
                            }
                            <Button
                                onClick={verifyUserOTP}
                                className="w-100 button-color-function"
                                style={{
                                    height: "45px",
                                    borderRadius: "12px",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                }}
                            >
                                Verifica codice OTP
                            </Button>
                        </Form>
                    )}
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
                            Sei nuovo?
                        </h2    >
                        <p style={{ color: "#6c757d", fontSize: "14px" }}>
                            Crea il tuo account in pochi secondi
                        </p>

                        {/* BOTTONE PREMIUM */}
                        <Link
                            to='/register'
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
                            Registrati
                            <ArrowRight size={18} style={{ marginLeft: "8px" }} />
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login