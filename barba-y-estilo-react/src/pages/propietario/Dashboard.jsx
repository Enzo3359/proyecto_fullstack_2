import { obtenerCortes } from '../../data/cortes'
import { obtenerReservas } from '../../data/reservas'

function formatearCLP(numero) {
  return '$' + Number(numero).toLocaleString('es-CL')
}

function DashboardPropietario() {
  const cortes = obtenerCortes()
  const reservas = obtenerReservas()

  const totalIngresos = cortes.reduce((suma, c) => suma + Number(c.importe), 0)
  const totalReservas = reservas.length
  const totalCortes = cortes.length

  const barberosActivos = new Set()
  cortes.forEach((c) => barberosActivos.add(c.barbero))
  reservas.forEach((r) => barberosActivos.add(r.barbero))

  const rendimiento = [...barberosActivos].map((nombreBarbero) => {
    const cortesDelBarbero = cortes.filter((c) => c.barbero === nombreBarbero)
    const reservasDelBarbero = reservas.filter((r) => r.barbero === nombreBarbero)
    const ingresosDelBarbero = cortesDelBarbero.reduce((suma, c) => suma + Number(c.importe), 0)

    return {
      nombreBarbero,
      cortes: cortesDelBarbero.length,
      reservas: reservasDelBarbero.length,
      ingresos: ingresosDelBarbero
    }
  })

  return (
    <main className="container py-5">
      <h1>Panel del Propietario</h1>
      <p>Toda la analítica de tu Barbería en un solo lugar</p>

      <div className="row row-cols-1 row-cols-md-4 g-4 my-4">
        <div className="col">
          <div className="card bg-dark border-danger text-center h-100 hover-lift">
            <div className="card-body">
              <h2 className="h6">Ingresos Totales</h2>
              <p className="h4 fw-bold mb-0">{formatearCLP(totalIngresos)}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-dark border-danger text-center h-100 hover-lift">
            <div className="card-body">
              <h2 className="h6">Reservas Totales</h2>
              <p className="h4 fw-bold mb-0">{totalReservas}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-dark border-danger text-center h-100 hover-lift">
            <div className="card-body">
              <h2 className="h6">Barberos Activos</h2>
              <p className="h4 fw-bold mb-0">{barberosActivos.size}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-dark border-danger text-center h-100 hover-lift">
            <div className="card-body">
              <h2 className="h6">Cortes Realizados</h2>
              <p className="h4 fw-bold mb-0">{totalCortes}</p>
            </div>
          </div>
        </div>
      </div>

      <h2>Rendimiento por Barbero</h2>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Barbero</th>
            <th>Cortes</th>
            <th>Reservas</th>
            <th>Ingresos Generados</th>
          </tr>
        </thead>
        <tbody>
          {rendimiento.length === 0 ? (
            <tr><td colSpan="4" className="text-center text-secondary">Aún no hay actividad registrada.</td></tr>
          ) : (
            rendimiento.map((r) => (
              <tr key={r.nombreBarbero}>
                <td>{r.nombreBarbero}</td>
                <td>{r.cortes}</td>
                <td>{r.reservas}</td>
                <td>{formatearCLP(r.ingresos)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  )
}

export default DashboardPropietario
