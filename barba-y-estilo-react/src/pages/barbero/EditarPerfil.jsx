import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerSesion } from '../../data/usuarios'
import { obtenerOCrearBarbero, actualizarBarberoPorCorreo } from '../../data/barberos'

function EditarPerfilBarbero() {
  const navigate = useNavigate()
  const sesion = obtenerSesion()
  const perfilActual = obtenerOCrearBarbero(sesion)

  const [nombre, setNombre] = useState(perfilActual.nombre)
  const [telefono, setTelefono] = useState(perfilActual.telefono)
  const [especialidad, setEspecialidad] = useState(perfilActual.especialidad)
  const [descripcion, setDescripcion] = useState(perfilActual.descripcion)

  const [contrasenaNueva, setContrasenaNueva] = useState('')
  const [contrasenaConfirmar, setContrasenaConfirmar] = useState('')
  const [mensajeSeguridad, setMensajeSeguridad] = useState('')

  function guardarDatos(e) {
    e.preventDefault()
    actualizarBarberoPorCorreo(sesion.correo, { nombre, telefono, especialidad, descripcion })
    navigate('/barbero/perfil')
  }

  function cambiarContrasena(e) {
    e.preventDefault()

    if (contrasenaNueva !== contrasenaConfirmar) {
      setMensajeSeguridad('Las contraseñas no coinciden.')
      return
    }

    setMensajeSeguridad('Contraseña actualizada.')
    setContrasenaNueva('')
    setContrasenaConfirmar('')
  }

  return (
    <main className="container py-5" style={{ maxWidth: '500px' }}>
      <h1>Editar perfil</h1>

      <section className="mb-5">
        <h2 className="h4">Datos personales</h2>
        <form onSubmit={guardarDatos}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo Electrónico:</label>
            <input type="email" className="form-control" id="correo" value={sesion.correo} disabled readOnly />
            <div className="form-text">El correo no se puede editar: es el que usas para iniciar sesión.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Número de Teléfono:</label>
            <input type="tel" className="form-control" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="especialidad" className="form-label">Especialidad:</label>
            <input type="text" className="form-control" id="especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción (se muestra en "Conócenos"):</label>
            <textarea className="form-control" id="descripcion" rows="3" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-danger">Guardar cambios</button>
        </form>
      </section>

      <section>
        <h2 className="h4">Seguridad de la cuenta</h2>
        <form onSubmit={cambiarContrasena}>
          <div className="mb-3">
            <label htmlFor="contrasena-actual" className="form-label">Contraseña Actual:</label>
            <input type="password" className="form-control" id="contrasena-actual" required />
          </div>

          <div className="mb-3">
            <label htmlFor="contrasena-nueva" className="form-label">Contraseña Nueva:</label>
            <input
              type="password"
              className="form-control"
              id="contrasena-nueva"
              value={contrasenaNueva}
              onChange={(e) => setContrasenaNueva(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contrasena-confirmar" className="form-label">Confirmar Contraseña:</label>
            <input
              type="password"
              className="form-control"
              id="contrasena-confirmar"
              value={contrasenaConfirmar}
              onChange={(e) => setContrasenaConfirmar(e.target.value)}
              required
            />
          </div>

          {mensajeSeguridad && (
            <p className={mensajeSeguridad === 'Contraseña actualizada.' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
              {mensajeSeguridad}
            </p>
          )}

          <button type="submit" className="btn btn-danger">Cambiar contraseña</button>
        </form>
      </section>
    </main>
  )
}

export default EditarPerfilBarbero
