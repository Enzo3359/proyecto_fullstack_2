import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Barba y Estilo</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/servicios">Servicios</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/reservar">Reservar Cita</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/resenas">Reseñas</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contactos">Contactos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/login">Iniciar sesión</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/register">Registrarse</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
