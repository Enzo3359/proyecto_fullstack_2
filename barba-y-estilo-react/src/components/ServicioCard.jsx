import { Link } from 'react-router-dom'
import Reveal from './Reveal'

function ServicioCard({ servicio }) {
  return (
    <Reveal className="col">
      <div className="card h-100 bg-dark text-white border-secondary hover-lift">
        <img
          src={servicio.imagen}
          className="card-img-top"
          alt={servicio.nombre}
          style={{ height: '180px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h3 className="h5">{servicio.nombre}</h3>
          <p className="flex-grow-1">{servicio.descripcion}</p>
          <p className="fw-bold text-danger">Precio: ${servicio.precio.toLocaleString('es-CL')}</p>
          <Link to="/reservar" className="btn btn-outline-light mt-auto">Reservar</Link>
        </div>
      </div>
    </Reveal>
  )
}

export default ServicioCard
