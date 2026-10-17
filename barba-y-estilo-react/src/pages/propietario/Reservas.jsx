import { obtenerReservas } from '../../data/reservas'

function ReservasPropietario() {
  const reservas = obtenerReservas()

  return (
    <main className="container py-5">
      <h1>Reservas</h1>
      <h2 className="h4">Resumen:</h2>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Servicio</th>
            <th>Barbero</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {reservas.length === 0 ? (
            <tr><td colSpan="5" className="text-center text-secondary">No hay reservas registradas.</td></tr>
          ) : (
            reservas.map((r) => (
              <tr key={r.id}>
                <td>{r.nombre}</td>
                <td>{r.servicio}</td>
                <td>{r.barbero || '-'}</td>
                <td>{r.fecha}</td>
                <td>{r.hora || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  )
}

export default ReservasPropietario
