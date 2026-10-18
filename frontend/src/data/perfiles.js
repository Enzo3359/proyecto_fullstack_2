const PERFIL_BARBERO_POR_DEFECTO = {
    nombre: 'Dylan Elgueta',
    correo: 'dy.elgueta@barberlatino.com',
    telefono: '+56 9 1234 5678',
    especialidad: 'Corte con Tijeras',
    notificaciones: true
};

const PERFIL_PROPIETARIO_POR_DEFECTO = {
    nombre: 'Valentina Rojas',
    correo: 'valentina.rojas@adminbarberlatino.com',
    telefono: '+56 9 5555 1234',
    notificaciones: true
};

export function obtenerPerfilBarbero() {
    const datos = localStorage.getItem('perfilBarbero');
    return datos ? JSON.parse(datos) : PERFIL_BARBERO_POR_DEFECTO;
}

export function guardarPerfilBarbero(perfil) {
    localStorage.setItem('perfilBarbero', JSON.stringify(perfil));
}

export function obtenerPerfilPropietario() {
    const datos = localStorage.getItem('perfilPropietario');
    return datos ? JSON.parse(datos) : PERFIL_PROPIETARIO_POR_DEFECTO;
}

export function guardarPerfilPropietario(perfil) {
    localStorage.setItem('perfilPropietario', JSON.stringify(perfil));
}
