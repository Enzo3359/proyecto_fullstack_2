import { useState } from 'react'
import { obtenerResenas, crearResena } from '../../data/resenas'
import Reveal from '../../components/Reveal'

const RESENAS_SEMILLA = [
  { id: 'seed-1', nombre: 'Enzo Moraga', calificacion: 5, comentario: 'Excelente atención, el mejor corte que me han hecho en años. Muy profesionales y puntuales.' },
  { id: 'seed-2', nombre: 'Martin Roa', calificacion: 5, comentario: 'Me encantó el ambiente del local y el resultado del fade quedó espectacular. Sin duda vuelvo.' },
  { id: 'seed-3', nombre: 'Ciro Huentelican', calificacion: 4, comentario: 'Buen servicio en general, aunque tuve que esperar un poco más de lo esperado. El corte quedó bien igual.' },
  { id: 'seed-4', nombre: 'Agustin Opazo', calificacion: 5, comentario: 'Llevo años viniendo a esta barbería y nunca me han decepcionado. Recomendado 100%.' },
]

function estrellas(numero) {
  const cant = Number(numero) || 5
  return '★'.repeat(cant) + '☆'.repeat(5 - cant)
}

function Resenas() {
  const [resenas, setResenas] = useState(obtenerResenas())
  const [nombre, setNombre] = useState('')
  const [calificacion, setCalificacion] = useState('5')
  const [comentario, setComentario] = useState('')

  function manejarEnvio(e) {
    e.preventDefault()

    if (!nombre || !comentario) {
      alert('Por favor completa tu nombre y comentario.')
      return
    }

    crearResena({ nombre, calificacion, comentario })
    setResenas(obtenerResenas())
    setNombre('')
    setComentario('')
    setCalificacion('5')

    alert('¡Gracias por tu reseña!')
  }

  const todasLasResenas = [...resenas].reverse().concat(RESENAS_SEMILLA)

  return (
    <main className="container py-5">
      <h1 className="text-center">Reseñas de nuestros clientes</h1>
      <p className="text-center">Cuéntanos tu experiencia o lee lo que opina la comunidad</p>

      <div className="row row-cols-1 row-cols-md-2 g-3 my-4">
        {todasLasResenas.map((r) => (
          <Reveal className="col" key={r.id}>
            <article className="card h-100 bg-dark text-white border-danger hover-lift">
              <div className="card-body">
                <p><strong>{r.nombre}:</strong> {estrellas(r.calificacion)}</p>
                <blockquote className="mb-0 fst-italic">"{r.comentario}"</blockquote>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <h2>Danos tu opinión:</h2>
      <form onSubmit={manejarEnvio} style={{ maxWidth: '500px' }}>
        <div className="mb-3">
          <label htmlFor="nombre-resena" className="form-label">Tu Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="nombre-resena"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Ej. Carlos Silva"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="calificacion" className="form-label">Calificación:</label>
          <select
            className="form-select"
            id="calificacion"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
          >
            <option value="5">★★★★★ (5/5) - Excelente</option>
            <option value="4">★★★★☆ (4/5) - Muy Bueno</option>
            <option value="3">★★★☆☆ (3/5) - Bueno</option>
            <option value="2">★★☆☆☆ (2/5) - Regular</option>
            <option value="1">★☆☆☆☆ (1/5) - Malo</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="comentario" className="form-label">Tu opinión:</label>
          <textarea
            className="form-control"
            id="comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
            placeholder="Escribe tu opinión..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-danger">PUBLICAR RESEÑA</button>
      </form>
    </main>
  )
}

export default Resenas
