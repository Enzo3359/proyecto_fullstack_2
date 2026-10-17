import { Link } from 'react-router-dom'
import fondoHero from '../assets/fondo-hero.jpg'
import { obtenerSesion } from '../data/usuarios'
import { RUTA_POR_ROL } from '../data/roles'

function Home() {
  const sesion = obtenerSesion()
  const esPersonal = sesion?.rol === 'barbero' || sesion?.rol === 'propietario'

  return (
    <main>
      <section
        className="text-white text-center d-flex flex-column justify-content-center hero-animado hero-texto-fijo"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url(${fondoHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        <h1 className="display-4 fw-bold text-danger">
          CORTES <span className="text-white">/</span> CON ACTITUD
        </h1>
        <p className="lead">Cortes clásicos y degradados</p>
        <div>
          {esPersonal ? (
            <Link to={RUTA_POR_ROL[sesion.rol]} className="btn btn-danger btn-lg">Ir a mi panel</Link>
          ) : (
            <>
              <Link to="/reservar" className="btn btn-danger btn-lg me-2">Reservar cita</Link>
              <Link to="/servicios" className="btn btn-outline-light btn-lg">Ver servicios</Link>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default Home
