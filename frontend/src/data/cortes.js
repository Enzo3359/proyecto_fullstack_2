import { crear, leerTodos, eliminar } from './db';

const CLAVE_CORTES = 'cortesBarberia';

export function crearCorte({ cliente, servicio, barbero, fecha, importe }) {
    return crear(CLAVE_CORTES, { cliente, servicio, barbero, fecha, importe: Number(importe) });
}

export function obtenerCortes() {
    return leerTodos(CLAVE_CORTES);
}

export function eliminarCorte(id) {
    eliminar(CLAVE_CORTES, id);
}
