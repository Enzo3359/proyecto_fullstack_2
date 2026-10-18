import { useState } from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [correo, setCorreo] = useState('')
  const [enviado, setEnviado] = useState(false)

  function manejarEnvio(e) {
    e.preventDefault()
    // Simulación: no hay backend ni envío de correo real.
    setEnviado(true)
  }

  return (
    <main className="container py-5" style={{ maxWidth: '400px' }}>
      <h1 className="text-center">Barba y Estilo</h1>
      <p className="text-center text-uppercase small">- Barbería -</p>

      <h2 className="h4 mt-4">¿Olvidaste tu contraseña?</h2>
      <p>Introduce tu correo electrónico y te enviaremos un enlace para restablecerla.</p>

      {enviado ? (
        <p className="text-success fw-bold">
          Si el correo existe, te enviamos un enlace para restablecer tu contraseña.
        </p>
      ) : (
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
              placeholder="ejemplo@correo.com"
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">Enviar enlace</button>
        </form>
      )}

      <Link to="/login" className="d-block mt-3">Volver a Login</Link>
    </main>
  )
}

export default ForgotPassword
