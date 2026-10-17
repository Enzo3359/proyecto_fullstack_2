import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVICIOS } from '../../data/servicios'
import { obtenerBarberos } from '../../data/barberos'
import { crearReserva } from '../../data/reservas'

function ReservaCita() {
  const hoy = new Date().toISOString().split('T')[0]
  const [barberos] = useState(() => obtenerBarberos())

  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [servicioId, setServicioId] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [barberoCorreo, setBarberoCorreo] = useState('')
  const [confirmacion, setConfirmacion] = useState('')

  function manejarEnvio(e) {
    e.preventDefault()

    if (!nombre || !telefono || !servicioId || !fecha || !hora || !barberoCorreo) {
      alert('Por favor completa todos los campos.')
      return
    }

    const servicio = SERVICIOS.find((s) => s.id === servicioId)
    const barberoSeleccionado = barberos.find((b) => b.correo === barberoCorreo)

    crearReserva({
      nombre,
      telefono,
      servicio: servicio.nombre,
      fecha,
      hora,
      barbero: barberoSeleccionado.nombre,
      barberoCorreo: barberoSeleccionado.correo
    })

    setConfirmacion(`¡Gracias ${nombre}! Tu reserva fue registrada con éxito.`)
    setNombre('')
    setTelefono('')
    setServicioId('')
    setFecha('')
    setHora('')
    setBarberoCorreo('')
  }

  return (
    <main className="container py-5" style={{ maxWidth: '600px' }}>
      <form onSubmit={manejarEnvio}>
        <p aria-live="polite" className="text-success">{confirmacion}</p>

        <h1>Reservar Cita</h1>
        <h2 className="h5">Ingrese sus datos para realizar la reserva:</h2>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre Completo:</label>
          <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Número de Teléfono:</label>
          <input type="tel" className="form-control" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="opciones" className="form-label">Seleccione el servicio deseado:</label>
          <select className="form-select" id="opciones" value={servicioId} onChange={(e) => setServicioId(e.target.value)} required>
            <option value="">Seleccione un servicio</option>
            {SERVICIOS.map((s) => (
              <option key={s.id} value={s.id}>{s.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha a Agendar:</label>
          <input type="date" className="form-control" id="fecha" min={hoy} value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="hora" className="form-label">Hora a Agendar:</label>
          <input type="time" className="form-control" id="hora" min="10:00" max="20:00" value={hora} onChange={(e) => setHora(e.target.value)} required />
        </div>

        <fieldset className="mb-3">
          <legend className="h5">Seleccione un Barbero</legend>
          <div className="row row-cols-3 g-3">
            {barberos.map((b) => (
              <div className="col" key={b.id}>
                <label
                  htmlFor={`barbero-${b.id}`}
                  className={`card h-100 bg-dark text-center p-3 hover-lift ${barberoCorreo === b.correo ? 'border-danger border-2' : 'border-secondary'}`}
                  style={{ cursor: 'pointer' }}
                >
                  {b.imagen ? (
                    <img
                      src={b.imagen}
                      alt={b.nombre}
                      className="rounded-circle mx-auto mb-2"
                      style={{ width: '90px', height: '90px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-secondary mx-auto mb-2 d-flex align-items-center justify-content-center fs-3"
                      style={{ width: '90px', height: '90px' }}
                    >
                      {b.nombre.charAt(0)}
                    </div>
                  )}
                  <span>{b.nombre}</span>
                  <input
                    className="visually-hidden"
                    type="radio"
                    name="barbero"
                    id={`barbero-${b.id}`}
                    value={b.correo}
                    checked={barberoCorreo === b.correo}
                    onChange={(e) => setBarberoCorreo(e.target.value)}
                    required
                  />
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="btn btn-danger">Reservar</button>
      </form>

      <Link to="/mis-reservas" className="btn btn-outline-light mt-3">Mis Reservas</Link>
    </main>
  )
}

export default ReservaCita
