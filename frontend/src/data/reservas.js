import { crear, leerTodos, eliminar } from './db';

const CLAVE_RESERVAS = 'reservasBarberia';

export function crearReserva({ nombre, telefono, servicio, fecha, hora, barbero }) {
    return crear(CLAVE_RESERVAS, { nombre, telefono, servicio, fecha, hora, barbero });
}

export function obtenerReservas() {
    return leerTodos(CLAVE_RESERVAS);
}

export function eliminarReserva(id) {
    eliminar(CLAVE_RESERVAS, id);
}
