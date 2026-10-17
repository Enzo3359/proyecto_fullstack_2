import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { registrarUsuario, guardarSesion } from '../../data/usuarios'
import { RUTA_POR_ROL } from '../../data/roles'

function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensaje, setMensaje] = useState('')

  function manejarEnvio(e) {
    e.preventDefault()
    try {
      const usuario = registrarUsuario({ nombre, correo, contrasena })
      guardarSesion(usuario)
      setMensaje('')

      const destino = location.state?.from || RUTA_POR_ROL[usuario.rol]
      navigate(destino)
    } catch (error) {
      setMensaje(error.message)
    }
  }

  return (
    <main className="container py-5" style={{ maxWidth: '400px' }}>
      <h1>Registro</h1>
      <p>Ingresa los datos para crear tu cuenta</p>

      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre Completo:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Ingrese su nombre"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo Electrónico:</label>
          <input
            type="email"
            className="form-control"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            placeholder="Ingrese su Correo"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contrasena" className="form-label">Contraseña:</label>
          <input
            type="password"
            className="form-control"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            placeholder="Ingrese Contraseña"
          />
        </div>

        {mensaje && <p className="text-danger fw-bold">{mensaje}</p>}

        <Link to="/login" className="d-block mb-3">¿ya tienes una cuenta?</Link>

        <button type="submit" className="btn btn-danger w-100">REGISTRARSE</button>
      </form>
    </main>
  )
}

export default Register
