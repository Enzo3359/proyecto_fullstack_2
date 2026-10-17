import { crear, leerTodos } from './db';
import { obtenerRolPorCorreo } from './roles';
import { buscarBarberoPorCorreo, crearBarbero } from './barberos';
import { buscarPropietarioPorCorreo, crearPropietario } from './propietarios';

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

    // Si el correo "parece" institucional pero con el dominio equivocado
    // (.cl en vez de .com), se rechaza en vez de dejarlo pasar como Cliente.
    const correoNormalizado = correo.trim().toLowerCase();
    if (correoNormalizado.endsWith('@barbayestilo.cl') || correoNormalizado.endsWith('@adminbarbayestilo.cl')) {
        throw new Error('Los correos institucionales deben terminar en .com, no en .cl.');
    }

    const rol = obtenerRolPorCorreo(correo);

    // Si es barbero o propietario y todavía no tiene ficha, se le crea una
    // con los datos básicos del registro.
    if (rol === 'barbero' && !buscarBarberoPorCorreo(correo)) {
        crearBarbero({ nombre, correo });
    }
    if (rol === 'propietario' && !buscarPropietarioPorCorreo(correo)) {
        crearPropietario({ nombre, correo });
    }

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

const CLAVE_SESION = 'sesionActual';
const CLAVE_CUENTAS_GUARDADAS = 'cuentasGuardadas';

export function obtenerCuentasGuardadas() {
    const datos = localStorage.getItem(CLAVE_CUENTAS_GUARDADAS);
    return datos ? JSON.parse(datos) : [];
}

function recordarCuenta({ correo, nombre, rol }) {
    const guardadas = obtenerCuentasGuardadas();
    const sinEsta = guardadas.filter(function (c) { return c.correo !== correo; });
    localStorage.setItem(CLAVE_CUENTAS_GUARDADAS, JSON.stringify([...sinEsta, { correo, nombre, rol }]));
}

export function olvidarCuenta(correo) {
    const guardadas = obtenerCuentasGuardadas().filter(function (c) { return c.correo !== correo; });
    localStorage.setItem(CLAVE_CUENTAS_GUARDADAS, JSON.stringify(guardadas));
}

export function guardarSesion(usuario) {
    const sesion = { correo: usuario.correo, nombre: usuario.nombre, rol: usuario.rol };
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
    recordarCuenta(sesion);
}

export function obtenerSesion() {
    const datos = localStorage.getItem(CLAVE_SESION);
    return datos ? JSON.parse(datos) : null;
}

// Salta a otra cuenta ya guardada, sin pedir contraseña de nuevo
// (es una comodidad para probar roles, no un inicio de sesión real).
export function cambiarACuenta(correo) {
    const usuario = buscarUsuarioPorCorreo(correo);
    if (!usuario) return null;
    guardarSesion(usuario);
    return usuario;
}

export function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
}
