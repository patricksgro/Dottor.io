import { AtSign, Key, Lock, User } from "lucide-react";
import { Button, Form } from "react-bootstrap";
import { register, sendOtpRegister } from "../../axios/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function RegisterPazient({ step, setStep, role }) {

    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const [pazientData, setPazientData] = useState({
        name: '',
        surname: '',
        dateOfBirth: '',
        role: role,
        email: '',
        password: '',
        otp: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setPazientData({
            ...pazientData,
            [name]: value
        })
    }

    const sendEmailOTP = async () => {
        try {
            await sendOtpRegister({ email: pazientData.email })
            toast.success("Codice OTP inviato via email 📩")
            setStep(4)
        } catch (err) {
            if (err.response?.status === 409) {
                setError(true)
            }
        }
    }

    const verifyAndRegister = async () => {
        try {
            await register({
                name: pazientData.name,
                surname: pazientData.surname,
                dateOfBirth: pazientData.dateOfBirth,
                role: pazientData.role,
                password: pazientData.password,
                email: pazientData.email,
                otp: pazientData.otp
            })
            navigate('/login')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {
                step === 2
                &&
                <Form>
                    <Form.Group className="mb-3 form-group-position">
                        <Form.Label>Nome*</Form.Label>
                        <User
                            size={28} style={{
                                position: 'absolute',
                                top: '70%',
                                left: '15px',
                                transform: 'translateY(-50%)',
                                color: '#a5a5a5ff'
                            }}
                        />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="text"
                            name='name'
                            value={pazientData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 form-group-position">
                        <Form.Label>Cognome*</Form.Label>
                        <User
                            size={28} style={{
                                position: 'absolute',
                                top: '70%',
                                left: '15px',
                                transform: 'translateY(-50%)',
                                color: '#a5a5a5ff'
                            }}
                        />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="text"
                            name='surname'
                            value={pazientData.surname}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Data di nascita*</Form.Label>
                        <Form.Control
                            type="date"
                            name='dateOfBirth'
                            value={pazientData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {
                        error &&
                        <div>
                            <p className='text-danger text-center'>I campi contrassegnati da '*' sono obbligatori</p>
                        </div>
                    }

                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Button onClick={() => setStep(1)} className="previus-button">
                                Indietro
                            </Button>
                        </div>

                        <div>
                            <Button onClick={() => {
                                if (pazientData.name === '' || pazientData.surname === '' || pazientData.dateOfBirth === '') {
                                    setError(true)
                                    return
                                }
                                setStep(3);
                                setError(false)
                            }}
                                className="button-color my-2">
                                Avanti
                            </Button>
                        </div>
                    </div>
                </Form>
            }

            {
                step === 3
                &&
                <Form>
                    <Form.Group className="mb-3 form-group-position">
                        <Form.Label>Email*</Form.Label>
                        <AtSign size={22} className="icons-not-stethoscope" />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="email"
                            name='email'
                            value={pazientData.email}
                            onChange={handleChange}
                            required
                            placeholder="name@example.com" />
                    </Form.Group>

                    {
                        error &&
                        <div>
                            <p className='text-danger text-center'>Inserire un email valida o che non sia già registrata</p>
                        </div>
                    }

                    <Button onClick={() => {
                        if (!pazientData.email) {
                            setError(true)
                            return
                        }
                        sendEmailOTP()
                        setError(false)
                    }}
                        className="button-color-function my-2">
                        Invia codice OTP
                    </Button>
                </Form>
            }

            {
                step === 4
                &&
                <Form>
                    <Form.Group className="mb-3 form-group-position">
                        <Form.Label>Crea una password*</Form.Label>
                        <Lock size={22} className="icons-not-stethoscope" />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="password"
                            name='password'
                            value={pazientData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 form-group-position">
                        <Form.Label>Conferma OTP*</Form.Label>
                        <Key size={22} className="icons-not-stethoscope" />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="text"
                            name='otp'
                            value={pazientData.otp}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {
                        error &&
                        <div>
                            <span className='text-danger'>
                                <ul>
                                    <li>Riempire tutti i campi</li>
                                    <li>La password deve avere almeno 8 caratteri</li>
                                    <li>Conferma l'OTP ricevuto via email </li>
                                </ul>
                            </span>
                        </div>
                    }

                    <Button onClick={() => {
                        if(pazientData.password === '' || pazientData.otp === '' || pazientData.password.length < 8) {
                            setError(true)
                            return
                        }
                        verifyAndRegister();
                        toast.success("Account creato! Ora puoi effettuare il login")
                    }} className="button-color-function my-2">
                        Verifica OTP
                    </Button>
                </Form>
            }
        </>
    )
}

export default RegisterPazient