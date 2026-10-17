import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { iniciarSesion, guardarSesion } from '../../data/usuarios'
import { RUTA_POR_ROL } from '../../data/roles'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensaje, setMensaje] = useState('')

  function manejarEnvio(e) {
    e.preventDefault()
    try {
      const usuario = iniciarSesion({ correo, contrasena })
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
      <h1>Login</h1>
      <p>Ingresa tu correo y tu contraseña para iniciar sesión</p>

      <form onSubmit={manejarEnvio}>
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

        <button type="submit" className="btn btn-danger w-100">Iniciar sesión</button>
      </form>

      <div className="mt-3">
        <Link to="/forgot-password" className="d-block">¿Olvidaste tu Contraseña?</Link>
        <Link to="/register" className="d-block">Crear una cuenta</Link>
      </div>
    </main>
  )
}

export default Login
