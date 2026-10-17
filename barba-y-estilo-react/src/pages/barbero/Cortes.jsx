import { useState } from 'react'
import { obtenerSesion } from '../../data/usuarios'
import { buscarBarberoPorCorreo } from '../../data/barberos'
import { obtenerReservas, marcarReservaComoPagada } from '../../data/reservas'
import { crearCorte, obtenerCortes, eliminarCorte } from '../../data/cortes'

const SERVICIOS_CORTE = ['Corte Pelo', 'Arreglo Barba', 'Tintura']

function formatearCLP(numero) {
  return '$' + Number(numero).toLocaleString('es-CL')
}

function Cortes() {
  const sesion = obtenerSesion()
  const miNombre = buscarBarberoPorCorreo(sesion.correo)?.nombre || sesion.nombre

  function filtrarMisReservas() {
    return obtenerReservas().filter((r) => r.barberoCorreo === sesion.correo || r.barbero === miNombre)
  }

  const [reservas, setReservas] = useState(filtrarMisReservas)
  const [montos, setMontos] = useState({})

  const [cortes, setCortes] = useState(obtenerCortes())
  const [cliente, setCliente] = useState('')
  const [servicio, setServicio] = useState(SERVICIOS_CORTE[0])
  const [fecha, setFecha] = useState('')
  const [importe, setImporte] = useState('')

  const reservasPendientes = reservas.filter((r) => !r.pagada)
  const totalCobrado = reservas
    .filter((r) => r.pagada)
    .reduce((suma, r) => suma + Number(r.importe || 0), 0)

  function manejarMarcarPagada(reserva) {
    const monto = montos[reserva.id]

    if (!monto || Number(monto) <= 0) {
      alert('Ingresa un monto válido antes de marcarla como pagada.')
      return
    }

    marcarReservaComoPagada(reserva.id, monto)
    crearCorte({ cliente: reserva.nombre, servicio: reserva.servicio, barbero: miNombre, barberoCorreo: sesion.correo, fecha: reserva.fecha, importe: monto })

    setReservas(filtrarMisReservas())
    setCortes(obtenerCortes())
    setMontos((actual) => ({ ...actual, [reserva.id]: '' }))
  }

  function manejarEnvio(e) {
    e.preventDefault()

    if (!cliente || !servicio || !fecha || !importe) {
      alert('Por favor completa todos los campos.')
      return
    }

    crearCorte({ cliente, servicio, barbero: miNombre, barberoCorreo: sesion.correo, fecha, importe })
    setCortes(obtenerCortes())

    setCliente('')
    setFecha('')
    setImporte('')

    alert('¡Corte registrado con éxito!')
  }

  function manejarEliminar(id) {
    if (!confirm('¿Seguro que deseas eliminar este registro de corte?')) return
    eliminarCorte(id)
    setCortes(obtenerCortes())
  }

  return (
    <main className="container py-5">
      <h1>Cortes Realizados</h1>
      <p>Consulta y gestiona el historial de servicios</p>

      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
          <h2 className="h4 mb-0">Reservas por cobrar</h2>
          <div className="card bg-dark border-danger text-center px-4 py-2">
            <small>Total cobrado</small>
            <p className="h4 fw-bold mb-0">{formatearCLP(totalCobrado)}</p>
          </div>
        </div>

        {reservasPendientes.length === 0 ? (
          <p className="text-secondary">No tienes reservas pendientes de pago.</p>
        ) : (
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Monto cobrado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reservasPendientes.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.nombre}</strong></td>
                  <td>{r.servicio}</td>
                  <td>{r.fecha}</td>
                  <td>{r.hora}</td>
                  <td style={{ maxWidth: '140px' }}>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="Ej: 8000"
                      value={montos[r.id] || ''}
                      onChange={(e) => setMontos((actual) => ({ ...actual, [r.id]: e.target.value }))}
                    />
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => manejarMarcarPagada(r)}>
                      Marcar como pagada
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="mb-5" style={{ maxWidth: '500px' }}>
        <h2 className="h4">Registrar Corte (sin reserva previa)</h2>
        <form onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label htmlFor="cliente" className="form-label">Cliente:</label>
            <input
              type="text"
              className="form-control"
              id="cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
              placeholder="Nombre del cliente"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tipo-servicio" className="form-label">Servicio Prestado:</label>
            <select
              className="form-select"
              id="tipo-servicio"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
            >
              {SERVICIOS_CORTE.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="fecha" className="form-label">Fecha:</label>
            <input
              type="date"
              className="form-control"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="importe" className="form-label">Ingreso ($):</label>
            <input
              type="number"
              className="form-control"
              id="importe"
              value={importe}
              onChange={(e) => setImporte(e.target.value)}
              required
              placeholder="Ej: 6500"
            />
          </div>

          <button type="submit" className="btn btn-danger">Guardar Corte</button>
        </form>
      </section>

      <h2 className="h4">Historial</h2>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Servicio</th>
            <th>Barbero</th>
            <th>Fecha</th>
            <th>Importe</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cortes.length === 0 ? (
            <tr><td colSpan="6" className="text-center text-secondary">No hay cortes registrados aún.</td></tr>
          ) : (
            [...cortes].reverse().map((c) => (
              <tr key={c.id}>
                <td><strong>{c.cliente}</strong></td>
                <td>{c.servicio}</td>
                <td>{c.barbero}</td>
                <td>{c.fecha}</td>
                <td className="text-warning fw-bold">${Number(c.importe).toLocaleString('es-CL')}</td>
                <td>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => manejarEliminar(c.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  )
}

export default Cortes
