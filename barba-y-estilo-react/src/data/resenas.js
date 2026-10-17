import { crear, leerTodos } from './db';

const CLAVE_RESENAS = 'resenasBarberia';

export function crearResena({ nombre, calificacion, comentario }) {
    return crear(CLAVE_RESENAS, {
        nombre,
        calificacion,
        comentario,
        fecha: new Date().toISOString().split('T')[0]
    });
}

export function obtenerResenas() {
    return leerTodos(CLAVE_RESENAS);
}
