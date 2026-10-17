import { obtenerCortes } from '../../data/cortes'

function formatearCLP(numero) {
  return '$' + Number(numero).toLocaleString('es-CL')
}

function Ingresos() {
  const cortes = obtenerCortes()

  const totalIngresos = cortes.reduce((suma, c) => suma + Number(c.importe), 0)
  const totalCortes = cortes.length
  const ticketPromedio = totalCortes > 0 ? totalIngresos / totalCortes : 0

  const resumenPorBarbero = {}
  cortes.forEach((c) => {
    if (!resumenPorBarbero[c.barbero]) {
      resumenPorBarbero[c.barbero] = { cortes: 0, ingresos: 0 }
    }
    resumenPorBarbero[c.barbero].cortes += 1
    resumenPorBarbero[c.barbero].ingresos += Number(c.importe)
  })

  return (
    <main className="container py-5">
      <h1>Ingresos</h1>
      <p>Ingresos generados a partir de los cortes registrados por los barberos</p>

      <div className="row row-cols-1 row-cols-md-3 g-4 my-4">
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
              <h2 className="h6">Cortes Realizados</h2>
              <p className="h4 fw-bold mb-0">{totalCortes}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-dark border-danger text-center h-100 hover-lift">
            <div className="card-body">
              <h2 className="h6">Ticket Promedio</h2>
              <p className="h4 fw-bold mb-0">{formatearCLP(Math.round(ticketPromedio))}</p>
            </div>
          </div>
        </div>
      </div>

      <h2>Ingresos por Barbero</h2>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Barbero</th>
            <th>Cortes</th>
            <th>Ingresos Generados</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(resumenPorBarbero).length === 0 ? (
            <tr><td colSpan="3" className="text-center text-secondary">No hay cortes registrados aún.</td></tr>
          ) : (
            Object.entries(resumenPorBarbero).map(([nombreBarbero, datos]) => (
              <tr key={nombreBarbero}>
                <td>{nombreBarbero}</td>
                <td>{datos.cortes}</td>
                <td>{formatearCLP(datos.ingresos)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  )
}

export default Ingresos
