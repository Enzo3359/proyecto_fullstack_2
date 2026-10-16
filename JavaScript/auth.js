function obtenerRolPorCorreo(correo) {
    const correoNormalizado = correo.trim().toLowerCase();

    if (correoNormalizado.endsWith('@adminbarberlatino.com')) {
        return 'propietario';
    }
    if (correoNormalizado.endsWith('@barberlatino.com')) {
        return 'barbero';
    }
    return 'cliente';
}

function redirigirSegunRol(rol) {
    const rutas = {
        propietario: '../Roles/Propietario/dashboard-propietario.html',
        barbero: '../Roles/Barbero/dashboard.html',
        cliente: '../Roles/Cliente/catalogo-servicios.html'
    };
    window.location.href = rutas[rol];
}

const CLAVE_USUARIOS = 'usuariosBarberia';

function obtenerUsuarios() {
    const datos = localStorage.getItem(CLAVE_USUARIOS);
    return datos ? JSON.parse(datos) : [];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

function buscarUsuarioPorCorreo(correo) {
    const correoNormalizado = correo.trim().toLowerCase();
    return obtenerUsuarios().find(function (usuario) {
        return usuario.correo.toLowerCase() === correoNormalizado;
    });
}
