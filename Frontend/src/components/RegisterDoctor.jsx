import { AtSign, Clipboard, Compass, Euro, Globe, HeartPulse, Key, Lock, Map, MapPin, Phone, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { register, sendOtpRegister } from "../../axios/auth";
import { SPECIALIZATIONS } from "../../specializationsList.js"
import { toast } from "react-toastify";

function RegisterDoctor({ step, setStep, role }) {

    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const [doctorData, setdoctorData] = useState({
        name: '',
        surname: '',
        dateOfBirth: '',
        role: role,
        address: {
            country: '',
            city: '',
            postalCode: '',
            street: ''
        },
        phone: '',
        specialization: [],
        price: '',
        description: '',
        email: '',
        password: '',
        otp: ''
    })

    //errore per campi lasciati vuoti
    const emptyInput =
        doctorData.name === '' ||
        doctorData.surname === '' ||
        doctorData.dateOfBirth === '' ||
        doctorData.phone === '' ||
        doctorData.specialization === '' ||
        doctorData.price === '' ||
        doctorData.description === '' ||
        doctorData.address.street === '' ||
        doctorData.address.postalCode === '' ||
        doctorData.address.city === '' ||
        doctorData.address.country === ''


    const handleChange = (e) => {
        const { name, value } = e.target

        if (name.startsWith('address.')) {
            const field = name.split('.')[1]

            setdoctorData({
                ...doctorData,
                address: {
                    ...doctorData.address,
                    [field]: value
                }
            })
            return
        }

        setdoctorData({
            ...doctorData,
            [name]: value
        })
    }

    const sendEmailOTP = async () => {
        try {
            await sendOtpRegister({ email: doctorData.email })
            toast.success("Codice OTP inviato via email 📩")
            setStep(6)
        } catch (err) {
            if (err.response?.status === 409) {
                setError(true)
            }
        }
    }

    const verifyAndRegister = async () => {
        try {
            await register(doctorData)
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
                        <Stethoscope size={28} style={{
                            position: 'absolute',
                            top: '70%',
                            left: '15px',
                            transform: 'translateY(-50%)',
                            color: '#a5a5a5ff'
                        }} />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="text"
                            name='name'
                            value={doctorData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 form-group-position">
                        <Form.Label>Cognome*</Form.Label>
                        <Stethoscope size={28} style={{
                            position: 'absolute',
                            top: '70%',
                            left: '15px',
                            transform: 'translateY(-50%)',
                            color: '#a5a5a5ff'
                        }} />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="text"
                            name='surname'
                            value={doctorData.surname}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Data di nascita*</Form.Label>
                        <Form.Control
                            type="date"
                            name='dateOfBirth'
                            value={doctorData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Button onClick={() => setStep(1)} className="previus-button">
                                Indietro
                            </Button>
                        </div>

                        <div>
                            <Button onClick={() => {
                                setStep(3);
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
                    < Form.Group className="mb-3 form-group-position">
                        <Form.Label>Stato*</Form.Label>
                        <Globe size={22} className="icons-not-stethoscope" />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="text"
                            name='address.country'
                            value={doctorData.address.country}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group >
                    <Form.Group className="mb-3 form-group-position">
                        <Form.Label>Città*</Form.Label>
                        <Map size={22} className="icons-not-stethoscope" />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="text"
                            name='address.city'
                            value={doctorData.address.city}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 form-group-position">
                        <Form.Label>Codice postale*</Form.Label>
                        <MapPin size={22} className="icons-not-stethoscope" />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="text"
                            name='address.postalCode'
                            value={doctorData.address.postalCode}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 form-group-position">
                        <Form.Label>Indirizzo*</Form.Label>
                        <Compass size={22} className="icons-not-stethoscope" />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="text"
                            name='address.street'
                            value={doctorData.address.street}
                            onChange={handleChange}
                            required
                            placeholder="es. Via Roma 10" />
                    </Form.Group>
                    <Form.Group className="mb-3 form-group-position">
                        <Form.Label>Cellulare*</Form.Label>
                        <Phone size={22} className="icons-not-stethoscope" />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="text"
                            name='phone'
                            value={doctorData.phone}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Button onClick={() => setStep(2)} className="previus-button">
                                Indietro
                            </Button>
                        </div>

                        <div>
                            <Button onClick={() => setStep(4)} className="button-color my-2">
                                Avanti
                            </Button>
                        </div>
                    </div>
                </Form>
            }

            {
                step === 4
                &&
                <Form>
                    < Form.Group className="mb-3 form-group-position">
                        <Form.Label>Specializzazione*</Form.Label>
                        <HeartPulse size={22} className="icons-not-stethoscope" />
                        <Form.Select
                            className="inputTextColorOnFocus form-control-distances"
                            name="specialization"
                            value={doctorData.specialization}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleziona una specializzazione</option>

                            {SPECIALIZATIONS.map(spec => (
                                <option key={spec} value={spec}>
                                    {spec}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group >
                    <Form.Group className="mb-3 form-group-position">
                        <Form.Label>Prezzo visite*</Form.Label>
                        <Euro size={22} className="icons-not-stethoscope" />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="number"
                            name='price'
                            value={doctorData.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 form-group-position">
                        <Form.Label>Descrizione*</Form.Label>
                        <Clipboard size={22} className="icons-not-stethoscope" />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            as="textarea"
                            name='description'
                            value={doctorData.description}
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
                            <Button onClick={() => { setStep(3); setError(false) }} className="previus-button">
                                Indietro
                            </Button>
                        </div>

                        <div>
                            <Button onClick={() => {
                                if (emptyInput) {
                                    setError(true)
                                    return
                                }
                                setStep(5)
                                setError(false)
                            }}
                                className="button-color-function my-2">
                                Avanti
                            </Button>
                        </div>
                    </div>
                </Form >
            }

            {
                step === 5
                &&
                <Form>
                    <Form.Group className="mb-3 form-group-position">
                        <Form.Label>Email*</Form.Label>
                        <AtSign size={22} className="icons-not-stethoscope" />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="email"
                            name='email'
                            value={doctorData.email}
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
                        if (!doctorData.email) {
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
                step === 6 &&
                <Form>
                    <Form.Group className="mb-3 form-group-position">
                        <Form.Label>Crea una password*</Form.Label>
                        <Lock size={22} className="icons-not-stethoscope" />
                        <Form.Control
                            className="inputTextColorOnFocus form-control-distances"
                            type="password"
                            name='password'
                            value={doctorData.password}
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
                            value={doctorData.otp}
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
                        if (doctorData.password === '' || doctorData.otp === '' || doctorData.password.length < 8) {
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

export default RegisterDoctor