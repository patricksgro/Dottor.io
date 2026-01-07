import { NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import '../style/Navigation.css'

function SpecializationsList() {
    return (
        <>
            <div className="display-none-over-1664px my-5" id="specializzazioni">
                <h2>
                    Tutte le specializzazioni
                </h2>
                <div className="mx-2">
                    <div>
                        <NavDropdown.Item className='on-hover' style={{ borderBottom: 'solid 2px #e2e2e2ff' }}>A</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Agopuntori' as={Link}>Agopuntori</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Allergologi' as={Link}>Allergologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Anatomo-patologi' as={Link}>Anatomo-patologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Andrologi' as={Link}>Andrologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Angiologi' as={Link} style={{ marginBottom: '15px' }}>Angiologi</NavDropdown.Item>
                    </div>
                    <div>
                        <NavDropdown.Item className='on-hover' style={{ borderBottom: 'solid 2px #e2e2e2ff' }}>C</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Cardiochirurghi' as={Link}>Cardiochirurghi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Cardiologi' as={Link}>Cardiologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Cardiologi-Pediatri' as={Link}>Cardiologi Pediatri</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Chirurghi-Generali' as={Link}>Chirurghi Generali</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Chirurghi-Maxillo-facciali' as={Link}>Chirurghi Maxillo-facciali</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Chirurghi-Pediatrici' as={Link}>Chirurghi Pediatrici</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Chirurghi-Plastici' as={Link}>Chirurghi Plastici</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Chirurghi-Proctologi' as={Link}>Chirurghi Proctologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Chirurghi-Toracici' as={Link}>Chirurghi Toracici</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Chirurghi-Vascolari' as={Link}>Chirurghi Vascolari</NavDropdown.Item>
                    </div>
                </div>
                {/* Secondo blocco */}
                <div className="mx-2">
                    <div>
                        <NavDropdown.Item className='on-hover' style={{ borderBottom: 'solid 2px #e2e2e2ff' }}>D</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Dermatologi' as={Link}>Dermatologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Diabetologi' as={Link}>Diabetologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Dietologi' as={Link} style={{ marginBottom: '15px' }}>Dietologi</NavDropdown.Item>
                    </div>
                    <div>
                        <NavDropdown.Item className='on-hover' style={{ borderBottom: 'solid 2px #e2e2e2ff' }}>E</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Ecografisti' as={Link}>Ecografisti</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Ematologi' as={Link}>Ematologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Endocrinologi' as={Link} style={{ marginBottom: '15px' }}>Endocrinologi</NavDropdown.Item>
                    </div>
                    <div>
                        <NavDropdown.Item className='on-hover' style={{ borderBottom: 'solid 2px #e2e2e2ff' }}>F</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Fisiatri' as={Link} style={{ marginBottom: '15px' }}>Fisiatri</NavDropdown.Item>
                    </div>
                    <div>
                        <NavDropdown.Item className='on-hover' style={{ borderBottom: 'solid 2px #e2e2e2ff' }}>G</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Gastroenterologi' as={Link}>Gastroenterologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Medici-Genetisti' as={Link}>Medici Genetisti</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Geriatri' as={Link}>Geriatri</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Ginecologi' as={Link} style={{ marginBottom: '15px' }}>Ginecologi</NavDropdown.Item>
                    </div>
                    <div>
                        <NavDropdown.Item className='on-hover' style={{ borderBottom: 'solid 2px #e2e2e2ff' }}>I</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Immunologi' as={Link}>Immunologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Infettivologi' as={Link}>Infettivologi</NavDropdown.Item>
                    </div>
                </div>
                {/* Terzo blocco */}
                <div className="mx-2">
                    <div>
                        <NavDropdown.Item className='on-hover' style={{ borderBottom: 'solid 2px #e2e2e2ff' }}>M</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Medici-terapisti-del-dolore' as={Link}>Medici terapisti del dolore</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Medici-dello-Sport' as={Link}>Medici dello Sport</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Medici-Estetici' as={Link}>Medici Estetici</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Medici-Internisti' as={Link}>Medici Internisti</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Medici-Legali' as={Link}>Medici Legali</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Medici-Nucleari' as={Link} style={{ marginBottom: '15px' }}>Medici Nucleari</NavDropdown.Item>
                    </div>
                    <div>
                        <NavDropdown.Item className='on-hover' style={{ borderBottom: 'solid 2px #e2e2e2ff' }}>N</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Nefrologi' as={Link}>Nefrologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Neurochirurghi' as={Link}>Neurochirurghi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Neurofisiopatologi' as={Link}>Neurofisiopatologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Neurologi' as={Link}>Neurologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Neuropsichiatri-infantili' as={Link} style={{ marginBottom: '15px' }}>Neuropsichiatri infantili</NavDropdown.Item>
                    </div>
                    <div>
                        <NavDropdown.Item className='on-hover' style={{ borderBottom: 'solid 2px #e2e2e2ff' }}>O</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Oculisti' as={Link}>Oculisti</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Dentisti-Odontoiatri' as={Link}>Dentisti o Odontoiatri</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Omeopati' as={Link}>Omeopati</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Oncologi' as={Link}>Oncologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Ortopedici' as={Link}>Ortopedici</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Otorinolaringoiatri' as={Link}>Otorinolaringoiatri</NavDropdown.Item>
                    </div>
                </div>
                {/* Quarto blocco */}
                <div className="mx-2">
                    <div>
                        <NavDropdown.Item className='on-hover' style={{ borderBottom: 'solid 2px #e2e2e2ff' }}>P</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Pediatri' as={Link}>Pediatri</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Pneumologi' as={Link}>Pneumologi</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Psichiatri' as={Link} style={{ marginBottom: '15px' }}>Psichiatri</NavDropdown.Item>
                    </div>
                    <div>
                        <NavDropdown.Item className='on-hover' style={{ borderBottom: 'solid 2px #e2e2e2ff' }}>R</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Radiologi-Interventisti' as={Link}>Radiologi Interventisti</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Radiologi-diagnostici' as={Link}>Radiologi diagnostici</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Reumatologi' as={Link} style={{ marginBottom: '15px' }}>Reumatologi</NavDropdown.Item>
                    </div>
                    <div>
                        <NavDropdown.Item className='on-hover' style={{ borderBottom: 'solid 2px #e2e2e2ff' }}>S</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Senologi' as={Link} style={{ marginBottom: '15px' }}>Senologi</NavDropdown.Item>
                    </div>
                    <div>
                        <NavDropdown.Item className='on-hover' style={{ borderBottom: 'solid 2px #e2e2e2ff' }}>U</NavDropdown.Item>
                        <NavDropdown.Item className='on-hover' to='/specializzazioni/Urologi' as={Link}>Urologi</NavDropdown.Item>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpecializationsList