import { crear, leerTodos, actualizar, eliminar } from './db'
import dylanFoto from '../assets/barberos/dylan.jpg'
import enzoFoto from '../assets/barberos/enzo.jpg'
import arletteFoto from '../assets/barberos/arlette.jpg'

const CLAVE_BARBEROS = 'barberosBarberia'

function sembrarBarberosPorDefecto() {
    const existentes = leerTodos(CLAVE_BARBEROS)
    if (existentes.length > 0) return

    crear(CLAVE_BARBEROS, {
        nombre: 'Dylan Elgueta',
        correo: 'dy.elgueta@barbayestilo.com',
        telefono: '+56 9 1234 5678',
        especialidad: 'Corte con Tijeras',
        descripcion: 'Con más de 5 años de experiencia, Dylan es reconocido por sus cortes clásicos a tijera y su atención al detalle en cada corte.',
        imagen: dylanFoto,
        notificaciones: true
    })
    crear(CLAVE_BARBEROS, {
        nombre: 'Enzo Moraga',
        correo: 'enzo@barbayestilo.com',
        telefono: '',
        especialidad: 'Fade y Degradados',
        descripcion: 'Enzo se especializa en degradados modernos y diseños personalizados, siempre al tanto de las últimas tendencias urbanas.',
        imagen: enzoFoto,
        notificaciones: true
    })
    crear(CLAVE_BARBEROS, {
        nombre: 'Arlette Hevia',
        correo: 'arlette@barbayestilo.com',
        telefono: '',
        especialidad: 'Diseño y Coloración',
        descripcion: 'Arlette combina técnicas modernas de corte y coloración con un trato cercano y atento a cada detalle, logrando estilos personalizados para cada cliente.',
        imagen: arletteFoto,
        notificaciones: true
    })
}

export function obtenerBarberos() {
    sembrarBarberosPorDefecto()
    return leerTodos(CLAVE_BARBEROS)
}

export function buscarBarberoPorCorreo(correo) {
    const correoNormalizado = correo.trim().toLowerCase()
    return obtenerBarberos().find(function (barbero) {
        return barbero.correo.toLowerCase() === correoNormalizado
    })
}

export function crearBarbero({ nombre, correo, telefono = '', especialidad = 'Por definir', descripcion = '', imagen = null }) {
    if (buscarBarberoPorCorreo(correo)) {
        throw new Error('Ya existe un barbero registrado con ese correo.')
    }
    return crear(CLAVE_BARBEROS, { nombre, correo, telefono, especialidad, descripcion, imagen, notificaciones: true })
}

// Si la cuenta de login existe pero por alguna razón nunca se creó su ficha
// (ej. cuentas creadas antes de este cambio), se crea en el momento en vez de fallar.
export function obtenerOCrearBarbero({ nombre, correo }) {
    const existente = buscarBarberoPorCorreo(correo)
    if (existente) return existente
    return crear(CLAVE_BARBEROS, { nombre, correo, telefono: '', especialidad: 'Por definir', descripcion: '', imagen: null, notificaciones: true })
}

export function actualizarBarberoPorCorreo(correo, cambios) {
    const barbero = buscarBarberoPorCorreo(correo)
    if (!barbero) return null
    return actualizar(CLAVE_BARBEROS, barbero.id, cambios)
}

export function eliminarBarbero(id) {
    eliminar(CLAVE_BARBEROS, id)
}
