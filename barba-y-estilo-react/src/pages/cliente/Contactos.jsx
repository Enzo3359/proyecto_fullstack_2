function Contactos() {
  return (
    <main className="container py-5">
      <h1>Cómo Encontrarnos</h1>

      <section className="mb-5">
        <h2>Encuéntranos en:</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card bg-dark border-secondary h-100">
              <div className="card-body">
                <h3 className="h5">Sucursal Viña del Mar</h3>
                <a
                  href="https://maps.app.goo.gl/D3W7LqpEB93fKg8z5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-block mb-2"
                >
                  Ver en Google Maps
                </a>
                <p className="mb-0">Horario: Lunes a Sábado, 10:00 a 20:00 hrs</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card bg-dark border-secondary h-100">
              <div className="card-body">
                <h3 className="h5">Sucursal Limache</h3>
                <a
                  href="https://maps.app.goo.gl/KdnjvkoEndYgzG5d7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-block mb-2"
                >
                  Ver en Google Maps
                </a>
                <p className="mb-0">Horario: Lunes a Viernes 10:00–20:00, Sábado 10:00–18:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Nuestras Redes Sociales:</h2>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger me-2">
          Instagram
        </a>
        <a href="https://www.facebook.com/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger me-2">
          Facebook
        </a>
        <a href="https://x.com/?lang=es" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger">
          X
        </a>
      </section>
    </main>
  )
}

export default Contactos
