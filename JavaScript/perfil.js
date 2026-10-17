document.addEventListener('DOMContentLoaded', function () {

    const CLAVE_PERFIL = 'perfilBarbero';
    const PERFIL_POR_DEFECTO = {
        nombre: 'Dylan Elgueta',
        correo: 'dy.elgueta@barbayestilo.com',
        telefono: '+56 9 1234 5678',
        especialidad: 'Corte con Tijeras',
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
    document.getElementById('perfil-especialidad').textContent = perfil.especialidad;

    const casilla = document.getElementById('notificaciones');
    casilla.checked = perfil.notificaciones;

    casilla.addEventListener('change', function () {
        const actual = obtenerPerfil();
        actual.notificaciones = casilla.checked;
        localStorage.setItem(CLAVE_PERFIL, JSON.stringify(actual));
    });
});