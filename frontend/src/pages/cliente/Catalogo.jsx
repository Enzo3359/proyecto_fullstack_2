import ServicioCard from '../../components/ServicioCard'
import { SERVICIOS } from '../../data/servicios'

const CATEGORIAS = ['Cortes', 'Barba', 'Tintes']

function Catalogo() {
  return (
    <main className="container py-5">
      <h1 className="text-center mb-4">Nuestros servicios disponibles</h1>

      {CATEGORIAS.map((categoria) => (
        <section key={categoria} className="mb-5">
          <h2 className="text-danger">{categoria}</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {SERVICIOS.filter((s) => s.categoria === categoria).map((servicio) => (
              <ServicioCard key={servicio.id} servicio={servicio} />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

export default Catalogo
