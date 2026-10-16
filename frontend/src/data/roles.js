export function obtenerRolPorCorreo(correo) {
    const correoNormalizado = correo.trim().toLowerCase();

    if (correoNormalizado.endsWith('@adminbarberlatino.com')) {
        return 'propietario';
    }
    if (correoNormalizado.endsWith('@barberlatino.com')) {
        return 'barbero';
    }
    return 'cliente';
}

export const RUTA_POR_ROL = {
    propietario: '/propietario',
    barbero: '/barbero',
    cliente: '/servicios'
};
