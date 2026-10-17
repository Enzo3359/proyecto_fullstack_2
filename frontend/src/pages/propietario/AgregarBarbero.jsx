import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { crearBarbero } from '../../data/barberos'

const CORREO_BARBERO = /^[^\s@]+@barbayestilo\.com$/i

function AgregarBarbero() {
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [especialidad, setEspecialidad] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [mensaje, setMensaje] = useState('')

  function manejarEnvio(e) {
    e.preventDefault()

    if (!CORREO_BARBERO.test(correo.trim())) {
      setMensaje('El correo debe ser institucional, terminado en @barbayestilo.com')
      return
    }

    try {
      crearBarbero({ nombre, correo: correo.trim(), telefono, especialidad, descripcion })
      navigate('/conocenos')
    } catch (error) {
      setMensaje(error.message)
    }
  }

  return (
    <main className="container py-5" style={{ maxWidth: '500px' }}>
      <h1>Agregar Barbero</h1>
      <p>Se suma al equipo y aparece de inmediato en "Conócenos" y en el selector de "Reservar Cita".</p>

      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre completo:</label>
          <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo institucional:</label>
          <input type="email" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required placeholder="nombre@barbayestilo.com" />
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono (opcional):</label>
          <input type="tel" className="form-control" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="especialidad" className="form-label">Especialidad:</label>
          <input type="text" className="form-control" id="especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required placeholder="Ej: Fade y Degradados" />
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción (se muestra en "Conócenos"):</label>
          <textarea className="form-control" id="descripcion" rows="3" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>

        {mensaje && <p className="text-danger fw-bold">{mensaje}</p>}

        <button type="submit" className="btn btn-danger">Agregar Barbero</button>
      </form>

      <p className="mt-3">
        Este barbero todavía no podrá iniciar sesión hasta que se registre con este mismo correo en "Registrarse".
      </p>
    </main>
  )
}

export default AgregarBarbero
