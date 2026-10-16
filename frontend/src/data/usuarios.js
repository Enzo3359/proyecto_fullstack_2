import { crear, leerTodos } from './db';
import { obtenerRolPorCorreo } from './roles';

const CLAVE_USUARIOS = 'usuariosBarberia';

export function buscarUsuarioPorCorreo(correo) {
    const correoNormalizado = correo.trim().toLowerCase();
    return leerTodos(CLAVE_USUARIOS).find(function (usuario) {
        return usuario.correo.toLowerCase() === correoNormalizado;
    });
}

export function registrarUsuario({ nombre, correo, contrasena }) {
    if (buscarUsuarioPorCorreo(correo)) {
        throw new Error('Ya existe una cuenta registrada con ese correo.');
    }
    const rol = obtenerRolPorCorreo(correo);
    return crear(CLAVE_USUARIOS, { nombre, correo, contrasena, rol });
}

export function iniciarSesion({ correo, contrasena }) {
    const usuario = buscarUsuarioPorCorreo(correo);

    if (!usuario) {
        throw new Error('No existe una cuenta con ese correo. Regístrate primero.');
    }
    if (usuario.contrasena !== contrasena) {
        throw new Error('Contraseña incorrecta.');
    }
    return usuario;
}
