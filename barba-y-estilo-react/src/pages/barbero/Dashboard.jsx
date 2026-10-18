import { obtenerCortes } from '../../data/cortes'

function DashboardBarbero() {
  const cortes = obtenerCortes()
  const totalIngresos = cortes.reduce((suma, c) => suma + Number(c.importe), 0)
  const ultimos = cortes.slice(-5).reverse()

  return (
    <main className="container py-5">
      <h1>Panel del Barbero</h1>
      <p>Gestiona tu jornada en un solo lugar</p>

      <div className="row row-cols-1 row-cols-md-2 g-4 my-4">
        <div className="col">
          <div className="card bg-dark border-danger text-center h-100 hover-lift">
            <div className="card-body">
              <h2 className="h5">Total de Cortes</h2>
              <p className="display-6 fw-bold mb-0">{cortes.length}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-dark border-danger text-center h-100 hover-lift">
            <div className="card-body">
              <h2 className="h5">Ingresos Generados</h2>
              <p className="display-6 fw-bold mb-0">${totalIngresos.toLocaleString('es-CL')}</p>
            </div>
          </div>
        </div>
      </div>

      <h2>Últimos Cortes Realizados</h2>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Servicio</th>
            <th>Fecha</th>
            <th>Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {ultimos.length === 0 ? (
            <tr><td colSpan="4" className="text-center text-secondary">Aún no hay cortes registrados.</td></tr>
          ) : (
            ultimos.map((c) => (
              <tr key={c.id}>
                <td>{c.cliente}</td>
                <td>{c.servicio}</td>
                <td>{c.fecha}</td>
                <td>${Number(c.importe).toLocaleString('es-CL')}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  )
}

export default DashboardBarbero
