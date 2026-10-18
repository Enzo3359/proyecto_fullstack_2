import { crear, leerTodos, actualizar } from './db'

const CLAVE_PROPIETARIOS = 'propietariosBarberia'

export function obtenerPropietarios() {
    return leerTodos(CLAVE_PROPIETARIOS)
}

export function buscarPropietarioPorCorreo(correo) {
    const correoNormalizado = correo.trim().toLowerCase()
    return obtenerPropietarios().find(function (propietario) {
        return propietario.correo.toLowerCase() === correoNormalizado
    })
}

export function crearPropietario({ nombre, correo, telefono = '' }) {
    if (buscarPropietarioPorCorreo(correo)) {
        throw new Error('Ya existe un propietario registrado con ese correo.')
    }
    return crear(CLAVE_PROPIETARIOS, { nombre, correo, telefono, notificaciones: true })
}

// Si la cuenta de login existe pero por alguna razón nunca se creó su ficha
// (ej. cuentas creadas antes de este cambio), se crea en el momento en vez de fallar.
export function obtenerOCrearPropietario({ nombre, correo }) {
    const existente = buscarPropietarioPorCorreo(correo)
    if (existente) return existente
    return crear(CLAVE_PROPIETARIOS, { nombre, correo, telefono: '', notificaciones: true })
}

export function actualizarPropietarioPorCorreo(correo, cambios) {
    const propietario = buscarPropietarioPorCorreo(correo)
    if (!propietario) return null
    return actualizar(CLAVE_PROPIETARIOS, propietario.id, cambios)
}
