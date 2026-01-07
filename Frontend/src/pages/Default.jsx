import { Container } from "react-bootstrap";
import Search from "../components/Search"
import '../style/index.css'
import SpecializationsList from "../components/SpecializationsList";

function Default() {

    //LE TRE SEZIONE LE CAMBIAMO, ANZICHè IN LINEA LE METTIAMO UAN SOTTO L'ALTRA ED ACCANTO UN IMG RAFFIURATIVA E LA POSIZIONE ALETRNATA

    const features = [
        {
            title: "Pagamenti sicuri Stripe",
            text: "Tecnologia avanzata per garantire transazioni rapide e protette.",
            icon: "💳"
        },
        {
            title: "Ampia rete di specialisti",
            text: "Oltre 100.000 medici tra cui scegliere in tutta Italia.",
            icon: "🏥"
        },
        {
            title: "Prenotazioni immediate",
            text: "Blocca l'orario che preferisci in pochi secondi.",
            icon: "⚡"
        },
        {
            title: "Dati protetti",
            text: "Massima conformità GDPR e sicurezza dei tuoi dati sanitari.",
            icon: "🔒"
        }
    ];

    return (
        <>
            <div>
                <div
                    className="none-at-785px"
                    style={{
                        width: '100%',
                        paddingTop: '22%', // altezza relativa alla larghezza
                        background: 'linear-gradient(135deg, #39CCCC, #00C4CC)', // sfumatura
                        clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>

                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.1)'
                    }}></div>

                    <div style={{ position: 'absolute', top: 0, left: '13%' }}>
                        <h1 className="fw-bold" style={{
                            fontSize: '3vw',
                            paddingTop: '12%',
                            color: 'white',
                            textShadow: '2px 2px 8px rgba(0,0,0,0.3)', // ombra testo
                            lineHeight: '1.3'
                        }}>
                            Trova il medico della tua città. <br />
                            Scegli tra oltre <br /> 100000 specialisti e medici
                        </h1>
                    </div>
                </div>

                <Search />
            </div>

            <div style={{ marginTop: "6%", textAlign: "center" }}>
                <h2 style={{ fontWeight: "700", fontSize: "2.2vw" }}>Perché scegliere Dottor.io?</h2>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: "35px",
                        marginTop: "4%"
                    }}
                >
                    {features.map((f, i) => (
                        <div
                            key={i}
                            style={{
                                width: "22%",
                                minWidth: "260px",
                                padding: "30px",
                                borderRadius: "20px",
                                background: "white",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                transition: "0.3s"
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                        >
                            <div style={{ fontSize: "40px" }}>{f.icon}</div>
                            <h4 style={{ marginTop: "15px", fontWeight: "700" }}>{f.title}</h4>
                            <p style={{ marginTop: "10px", color: "#555" }}>{f.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Container>
                    <SpecializationsList />
            </Container>
        </>
    )
}

export default Default