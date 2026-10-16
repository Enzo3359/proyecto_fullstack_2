import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Login from './pages/cuenta/Login'
import Register from './pages/cuenta/Register'
import ForgotPassword from './pages/cuenta/ForgotPassword'
import Catalogo from './pages/cliente/Catalogo'
import ReservaCita from './pages/cliente/ReservaCita'
import MisReservas from './pages/cliente/MisReservas'
import Resenas from './pages/cliente/Resenas'
import Contactos from './pages/cliente/Contactos'
import DashboardBarbero from './pages/barbero/Dashboard'
import Cortes from './pages/barbero/Cortes'
import PerfilBarbero from './pages/barbero/Perfil'
import EditarPerfilBarbero from './pages/barbero/EditarPerfil'
import DashboardPropietario from './pages/propietario/Dashboard'
import ReservasPropietario from './pages/propietario/Reservas'
import Ingresos from './pages/propietario/Ingresos'
import PerfilPropietario from './pages/propietario/Perfil'
import EditarPerfilPropietario from './pages/propietario/EditarPerfil'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/servicios" element={<Catalogo />} />
        <Route path="/reservar" element={<ReservaCita />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        <Route path="/resenas" element={<Resenas />} />
        <Route path="/contactos" element={<Contactos />} />

        <Route path="/barbero" element={<DashboardBarbero />} />
        <Route path="/barbero/cortes" element={<Cortes />} />
        <Route path="/barbero/perfil" element={<PerfilBarbero />} />
        <Route path="/barbero/perfil/editar" element={<EditarPerfilBarbero />} />

        <Route path="/propietario" element={<DashboardPropietario />} />
        <Route path="/propietario/reservas" element={<ReservasPropietario />} />
        <Route path="/propietario/ingresos" element={<Ingresos />} />
        <Route path="/propietario/perfil" element={<PerfilPropietario />} />
        <Route path="/propietario/perfil/editar" element={<EditarPerfilPropietario />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
