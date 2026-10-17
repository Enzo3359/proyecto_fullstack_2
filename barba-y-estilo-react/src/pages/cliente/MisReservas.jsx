import { useState } from 'react'
import { obtenerReservas, eliminarReserva } from '../../data/reservas'

function MisReservas() {
  const [reservas, setReservas] = useState(obtenerReservas())

  function cancelar(id) {
    if (!confirm('¿Seguro que quieres cancelar esta reserva?')) return
    eliminarReserva(id)
    setReservas(obtenerReservas())
  }

  return (
    <main className="container py-5">
      <h1>Mis Reservas</h1>

      {reservas.length === 0 ? (
        <p>Todavía no tienes reservas.</p>
      ) : (
        <ul className="list-group">
          {reservas.map((reserva) => (
            <li key={reserva.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                <strong>{reserva.nombre}</strong> — {reserva.servicio} con{' '}
                <strong>{reserva.barbero}</strong> el {reserva.fecha} a las {reserva.hora} hs. (Tel: {reserva.telefono})
              </span>
              <button className="btn btn-outline-danger btn-sm" onClick={() => cancelar(reserva.id)}>
                Cancelar Cita
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default MisReservas
