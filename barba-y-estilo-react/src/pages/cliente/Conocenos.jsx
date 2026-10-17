import { useState } from 'react'
import { obtenerBarberos } from '../../data/barberos'
import Reveal from '../../components/Reveal'

function Conocenos() {
  const [barberos] = useState(() => obtenerBarberos())

  return (
    <main className="container py-5">
      <h1 className="text-center mb-2">Conócenos</h1>
      <p className="text-center mb-5">El equipo detrás de cada corte</p>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {barberos.map((b) => (
          <Reveal className="col" key={b.id}>
            <div className="card h-100 bg-dark border-secondary text-center p-3 hover-lift">
              {b.imagen ? (
                <img
                  src={b.imagen}
                  alt={b.nombre}
                  className="rounded-circle mx-auto mb-3"
                  style={{ width: '140px', height: '140px', objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="rounded-circle bg-secondary mx-auto mb-3 d-flex align-items-center justify-content-center fs-1"
                  style={{ width: '140px', height: '140px' }}
                >
                  {b.nombre.charAt(0)}
                </div>
              )}
              <div className="card-body">
                <h2 className="h5">{b.nombre}</h2>
                <p className="text-danger fw-bold">{b.especialidad}</p>
                <p>{b.descripcion}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  )
}

export default Conocenos
