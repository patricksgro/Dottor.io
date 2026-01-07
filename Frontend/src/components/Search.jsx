import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getDoctors } from '../../axios/doctor'
import '../style/search.css'

function Search() {
    const [search, setSearch] = useState('')
    const [searchCity, setSearchCity] = useState('')
    const [results, setResults] = useState([])
    const [showResults, setShowResults] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fetchDoctors = async () => {
                try {
                    const res = await getDoctors({ q: search, city: searchCity, page: 1, limit: 8 })
                    setResults(res.items)
                } catch (err) {
                    console.log(err)
                }
            }
            fetchDoctors()
        }, 300)

        return () => clearTimeout(timeout)
    }, [search, searchCity])

    return (
        <>
            {/* SEARCH */}
            <div className="search-wrapper">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Cerca per nome, cognome o specializzazione"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setShowResults(true)
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Cerca per città, es. 'Roma'"
                        value={searchCity}
                        onChange={(e) => {
                            setSearchCity(e.target.value)
                            setShowResults(true)
                        }}
                    />

                    <Button className='display-none-over-1664px'>
                        <a style={{color: 'white', textDecoration: 'none'}} href="#specializzazioni"> Vedi tutte le specializzazioni</a>
                    </Button>
                </div>

                {showResults && results.length > 0 && (
                    <div className="search-results">
                        {results.map(doctor => (
                            <Link
                                key={doctor._id}
                                to={`/doctor/${doctor._id}`}
                                onClick={() => setShowResults(false)}
                            >
                                <strong>{doctor.name} {doctor.surname}</strong>
                                <div className="result-sub">
                                    {doctor.specialization} · {doctor.address.city}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* TITLE */}
            <div className="search-title my-5">
                <h1>Con Dottor.io è semplice..</h1>
            </div>

            {/* CARDS */}
            <div className="info-cards">
                <div className="info-card">
                    <div className="icon-circle">
                        🔍
                    </div>
                    <h3>Cerca il tuo medico</h3>
                    <p>
                        Usa i filtri e <b>trova</b> lo specialista più adatto alle tue <b>esigenze</b>.
                    </p>
                </div>

                <div className="info-card">
                    <div className="icon-circle">
                        📅
                    </div>
                    <h3>Prenota la visita</h3>
                    <p>
                        Effettua la <b>prenotazione</b> con pagamento <b>sicuro</b> in pochi secondi.
                    </p>
                </div>

                <div className="info-card">
                    <div className="icon-circle">
                        ✅
                    </div>
                    <h3>Vai all’appuntamento</h3>
                    <p>
                        Presentati nel <b>giorno</b> e <b>orario</b> concordati. Semplice!
                    </p>
                </div>
            </div>
        </>
    )
}

export default Search
