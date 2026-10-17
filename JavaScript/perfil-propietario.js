document.addEventListener('DOMContentLoaded', function () {

    const CLAVE_PERFIL = 'perfilPropietario';
    const PERFIL_POR_DEFECTO = {
        nombre: 'Valentina Rojas',
        correo: 'valentina.rojas@adminbarbayestilo.com',
        telefono: '+56 9 5555 1234',
        notificaciones: true
    };

    function obtenerPerfil() {
        const datos = localStorage.getItem(CLAVE_PERFIL);
        return datos ? JSON.parse(datos) : PERFIL_POR_DEFECTO;
    }

    const perfil = obtenerPerfil();

    document.getElementById('perfil-nombre').textContent = perfil.nombre;
    document.getElementById('perfil-correo').textContent = perfil.correo;
    document.getElementById('perfil-telefono').textContent = perfil.telefono;

    const casilla = document.getElementById('notificaciones');
    casilla.checked = perfil.notificaciones;

    casilla.addEventListener('change', function () {
        const actual = obtenerPerfil();
        actual.notificaciones = casilla.checked;
        localStorage.setItem(CLAVE_PERFIL, JSON.stringify(actual));
    });
});
