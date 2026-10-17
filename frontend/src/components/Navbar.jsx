import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { obtenerSesion, cerrarSesion, obtenerCuentasGuardadas, cambiarACuenta, olvidarCuenta } from '../data/usuarios'
import { RUTA_POR_ROL } from '../data/roles'
import logo from '../assets/logo.png'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  // Se vuelve a leer en cada cambio de ruta (login, logout y registro siempre
  // navegan a otra página), así el menú refleja la sesión real, no la URL actual.
  const sesion = obtenerSesion()
  const esBarbero = sesion?.rol === 'barbero'
  const esPropietario = sesion?.rol === 'propietario'
  const esHome = location.pathname === '/'
  const cuentasGuardadas = obtenerCuentasGuardadas()

  const [tema, setTema] = useState(() => localStorage.getItem('temaBarberia') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', tema)
    localStorage.setItem('temaBarberia', tema)
  }, [tema])

  function alternarTema() {
    setTema((actual) => (actual === 'dark' ? 'light' : 'dark'))
  }

  function manejarCerrarSesion() {
    cerrarSesion()
    navigate('/login')
  }

  function manejarCambiarCuenta(correo) {
    const usuario = cambiarACuenta(correo)
    if (usuario) navigate(RUTA_POR_ROL[usuario.rol])
  }

  function manejarOlvidarCuenta(e, correo) {
    e.stopPropagation()
    olvidarCuenta(correo)
    navigate(0)
  }

  // En Inicio el navbar flota sobre la foto y siempre es oscuro/traslúcido,
  // sin importar el tema — en el resto de páginas depende del modo claro/oscuro.
  const claseNavbarOscuro = esHome || tema === 'dark'

  return (
    <nav
      className={`navbar navbar-expand-lg ${claseNavbarOscuro ? 'navbar-dark' : 'navbar-light'} ${esHome ? 'w-100 position-absolute top-0 start-0' : ''}`}
      style={{
        backgroundColor: esHome ? 'rgba(0, 0, 0, 0.35)' : (tema === 'dark' ? '#0a0a0a' : '#ffffff'),
        backdropFilter: esHome ? 'blur(4px)' : undefined,
        zIndex: esHome ? 10 : undefined,
        borderBottom: !esHome && tema === 'light' ? '1px solid #ddd6c7' : undefined
      }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Barba y Estilo" height="40" />
        </Link>

        <button
          type="button"
          className="btn btn-sm rounded-circle border ms-auto me-2"
          style={{ width: '36px', height: '36px' }}
          onClick={alternarTema}
          aria-label="Cambiar modo claro/oscuro"
        >
          {tema === 'dark' ? '☀️' : '🌙'}
        </button>

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
            {esBarbero && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/barbero">Resumen</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/barbero/cortes">Cortes</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/barbero/perfil">Perfil</Link></li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={manejarCerrarSesion}>Cerrar Sesión</button>
                </li>
              </>
            )}

            {esPropietario && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/propietario">Resumen General</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/propietario/reservas">Reservas</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/propietario/ingresos">Ingresos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/propietario/barberos/nuevo">Agregar Barbero</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/propietario/perfil">Perfil</Link></li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={manejarCerrarSesion}>Cerrar Sesión</button>
                </li>
              </>
            )}

            {!esBarbero && !esPropietario && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/servicios">Servicios</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/reservar">Reservar Cita</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/conocenos">Conócenos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/resenas">Reseñas</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/contactos">Contactos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login">Iniciar sesión</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Registrarse</Link></li>
              </>
            )}

            {cuentasGuardadas.length > 0 && (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Cambiar de cuenta
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {cuentasGuardadas.map((c) => (
                    <li key={c.correo} className="d-flex align-items-center">
                      <button
                        className={`dropdown-item ${sesion?.correo === c.correo ? 'active' : ''}`}
                        onClick={() => manejarCambiarCuenta(c.correo)}
                      >
                        {c.nombre} <small className="text-secondary">({c.rol})</small>
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm text-danger me-2"
                        title="Olvidar esta cuenta"
                        onClick={(e) => manejarOlvidarCuenta(e, c.correo)}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/login">+ Agregar otra cuenta</Link></li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
