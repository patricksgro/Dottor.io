import { Button, Modal } from "react-bootstrap"
import instance from "../../../axios/axios"
import { useAuth } from "../../context/authContext"
import { toast } from "react-toastify";

function ModalConfirmReserveAndPay({ onHide, doctor }) {

    const { user } = useAuth()

    const toArrayDoctor = []
    toArrayDoctor.push(doctor)

    const checkOutPayment = async () => {
        try {
            const res = await instance.post('/payments/checkout', { toArrayDoctor }, { withCredentials: true })
            window.location.href = res.data.url
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal show={true} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-danger">Attenzione!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="fs-5">Prima di effettuare il pagamento assicurati di aver concordato con il dottor {doctor.name} {doctor.surname} giorno ed ora dell'appuntamento tramite i canali da esso forniti (sistema di messsaggistica, telefono, email).</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Indietro</Button>
                <Button
                    disabled
                    onClick={() => {
                        if (!user) {
                            toast.error('Per prenotare una visita devi prima registrarti')
                            return
                        }
                        checkOutPayment()
                    }}
                    style={{ backgroundColor: '#39CCCC', border: 'none' }}>
                    Conferma e vai a pagare
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirmReserveAndPay