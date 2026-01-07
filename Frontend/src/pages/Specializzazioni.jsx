import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { getSpecializations } from "../../axios/doctor"
import { useState } from "react"
import { Button, Container } from 'react-bootstrap'

function Specializzazioni() {

    const { specialization } = useParams()

    const [doctors, setDoctors] = useState(null)
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);

    //paginazione stato per la pagina che si aggiorna in funzione di essa con i bottoni appostiti
    //chiamata backend con parametri page e limit
    //hasNext solo se ci sono piu di una pagina

    console.log(doctors)

    useEffect(() => {
        const doctorSpecialization = async () => {
            const res = await getSpecializations(specialization, { page: page, limit: 3 })
            setDoctors(res.items)
            setHasNext(res.hasNext)
        }
        doctorSpecialization()
    }, [specialization, page])

    useEffect(() => {
        setPage(1)
    }, [specialization])

    return (
        <Container className="my-3">
            {
                doctors && doctors.length > 0 ?
                    <h1>
                        Risultati per - {specialization}
                    </h1>
                    :
                    <h1>
                        Nessuna risultato per {specialization}
                    </h1>
            }
            {
                doctors &&
                    doctors.length > 0 ? doctors.map(d => (
                        <div key={d._id} className="card mb-3" style={{ maxWidth: "80%", maxHeight: '350px' }}>
                            <div className="row g-0">
                                <div className="col-md-4" >
                                    <div style={{ height: "100%", maxHeight: "250px", paddingBottom: '1%' }}>
                                        <img src={d.avatar.url} alt="..." style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title fs-2 mb-0">{d.name} {d.surname}</h5>
                                        <p className="card-text pt-0 mt-0"><small className="text-body-secondary">{d.specialization} - {d.address.city}</small></p>
                                        <p className="card-text fs-5">Prezzo visite: €{d.price}</p>
                                        <p className="card-text">{d.description.slice(0, 85)}...</p>
                                        <p className="card-text fs-5">Sede: {d.address.street}, {d.address.postalCode}, {d.address.city}, {d.address.country}</p>
                                    </div>
                                </div>
                                <Button style={{ backgroundColor: '#39CCCC', border: 'none' }} >
                                    <Link
                                        to={`/doctor/${d._id}`}
                                        style={{ textDecoration: 'none', color: 'white' }}>
                                        Vai al profilo e prenota una visita
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))
                    :
                    null
            }

            <div className="d-flex gap-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(prev => prev - 1)}
                >
                    ◀ Prev
                </button>

                <button
                    disabled={!hasNext}
                    onClick={() => setPage(prev => prev + 1)}
                >
                    Next ▶
                </button>
            </div>
        </Container>
    )
}

export default Specializzazioni