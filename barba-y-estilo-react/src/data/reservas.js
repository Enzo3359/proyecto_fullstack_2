import { crear, leerTodos, actualizar, eliminar } from './db';

const CLAVE_RESERVAS = 'reservasBarberia';

export function crearReserva({ nombre, telefono, servicio, fecha, hora, barbero, barberoCorreo }) {
    return crear(CLAVE_RESERVAS, { nombre, telefono, servicio, fecha, hora, barbero, barberoCorreo, pagada: false });
}

export function obtenerReservas() {
    return leerTodos(CLAVE_RESERVAS);
}

export function marcarReservaComoPagada(id, importe) {
    return actualizar(CLAVE_RESERVAS, id, { pagada: true, importe: Number(importe) });
}

export function eliminarReserva(id) {
    eliminar(CLAVE_RESERVAS, id);
}
