import { useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerSesion } from '../../data/usuarios'
import { obtenerOCrearPropietario, actualizarPropietarioPorCorreo } from '../../data/propietarios'

function PerfilPropietario() {
  const sesion = obtenerSesion()
  const [perfil, setPerfil] = useState(() => obtenerOCrearPropietario(sesion))

  function manejarNotificaciones(e) {
    const actualizado = actualizarPropietarioPorCorreo(sesion.correo, { notificaciones: e.target.checked })
    setPerfil(actualizado)
  }

  return (
    <main className="container py-5">
      <h1>Perfil del Propietario</h1>
      <p>Administra tu información y preferencias</p>

      <section className="mb-4">
        <h2 className="h4">Información personal</h2>
        <dl>
          <dt>Nombre Completo</dt>
          <dd>{perfil.nombre}</dd>
          <dt>Correo Institucional</dt>
          <dd>{perfil.correo}</dd>
          <dt>Teléfono</dt>
          <dd>{perfil.telefono || '—'}</dd>
        </dl>
      </section>

      <section className="mb-4">
        <h2 className="h4">Preferencias de la cuenta</h2>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="notificaciones"
            checked={perfil.notificaciones}
            onChange={manejarNotificaciones}
          />
          <label className="form-check-label" htmlFor="notificaciones">Recibir notificaciones</label>
        </div>
      </section>

      <Link to="/propietario/perfil/editar" className="btn btn-outline-light">Editar Perfil</Link>
    </main>
  )
}

export default PerfilPropietario
