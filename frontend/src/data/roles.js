export function obtenerRolPorCorreo(correo) {
    const correoNormalizado = correo.trim().toLowerCase();

    if (correoNormalizado.endsWith('@adminbarbayestilo.com')) {
        return 'propietario';
    }
    if (correoNormalizado.endsWith('@barbayestilo.com')) {
        return 'barbero';
    }
    return 'cliente';
}

export const RUTA_POR_ROL = {
    propietario: '/propietario',
    barbero: '/barbero',
    cliente: '/servicios'
};
