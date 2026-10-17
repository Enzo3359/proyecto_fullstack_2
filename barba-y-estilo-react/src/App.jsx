import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RequireAuth from './components/RequireAuth'

import Home from './pages/Home'
import Login from './pages/cuenta/Login'
import Register from './pages/cuenta/Register'
import ForgotPassword from './pages/cuenta/ForgotPassword'
import Catalogo from './pages/cliente/Catalogo'
import ReservaCita from './pages/cliente/ReservaCita'
import MisReservas from './pages/cliente/MisReservas'
import Resenas from './pages/cliente/Resenas'
import Contactos from './pages/cliente/Contactos'
import Conocenos from './pages/cliente/Conocenos'
import DashboardBarbero from './pages/barbero/Dashboard'
import Cortes from './pages/barbero/Cortes'
import PerfilBarbero from './pages/barbero/Perfil'
import EditarPerfilBarbero from './pages/barbero/EditarPerfil'
import DashboardPropietario from './pages/propietario/Dashboard'
import ReservasPropietario from './pages/propietario/Reservas'
import Ingresos from './pages/propietario/Ingresos'
import PerfilPropietario from './pages/propietario/Perfil'
import EditarPerfilPropietario from './pages/propietario/EditarPerfil'
import AgregarBarbero from './pages/propietario/AgregarBarbero'

function App() {
  const location = useLocation()

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div key={location.pathname} className="page-fade flex-grow-1 d-flex flex-column">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/servicios" element={<Catalogo />} />
        <Route path="/reservar" element={<RequireAuth><ReservaCita /></RequireAuth>} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        <Route path="/resenas" element={<Resenas />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/conocenos" element={<Conocenos />} />

        <Route path="/barbero" element={<RequireAuth><DashboardBarbero /></RequireAuth>} />
        <Route path="/barbero/cortes" element={<RequireAuth><Cortes /></RequireAuth>} />
        <Route path="/barbero/perfil" element={<RequireAuth><PerfilBarbero /></RequireAuth>} />
        <Route path="/barbero/perfil/editar" element={<RequireAuth><EditarPerfilBarbero /></RequireAuth>} />

        <Route path="/propietario" element={<RequireAuth><DashboardPropietario /></RequireAuth>} />
        <Route path="/propietario/reservas" element={<RequireAuth><ReservasPropietario /></RequireAuth>} />
        <Route path="/propietario/ingresos" element={<RequireAuth><Ingresos /></RequireAuth>} />
        <Route path="/propietario/perfil" element={<RequireAuth><PerfilPropietario /></RequireAuth>} />
        <Route path="/propietario/perfil/editar" element={<RequireAuth><EditarPerfilPropietario /></RequireAuth>} />
        <Route path="/propietario/barberos/nuevo" element={<RequireAuth><AgregarBarbero /></RequireAuth>} />
      </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
