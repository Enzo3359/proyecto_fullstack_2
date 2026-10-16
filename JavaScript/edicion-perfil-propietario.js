document.addEventListener('DOMContentLoaded', function () {

    const CLAVE_PERFIL = 'perfilPropietario';
    const PERFIL_POR_DEFECTO = {
        nombre: 'Valentina Rojas',
        correo: 'valentina.rojas@adminbarberlatino.com',
        telefono: '+56 9 5555 1234',
        notificaciones: true
    };

    function obtenerPerfil() {
        const datos = localStorage.getItem(CLAVE_PERFIL);
        return datos ? JSON.parse(datos) : PERFIL_POR_DEFECTO;
    }

    const perfil = obtenerPerfil();
    const formDatos = document.getElementById('form-datos');
    const formSeguridad = document.getElementById('form-seguridad');
    const mensajeDatos = document.getElementById('mensaje-datos');
    const mensajeSeguridad = document.getElementById('mensaje-seguridad');

    document.getElementById('nombre').value = perfil.nombre;
    document.getElementById('correo').value = perfil.correo;
    document.getElementById('telefono').value = perfil.telefono;

    const CORREO_PROPIETARIO = /^[^\s@]+@adminbarberlatino\.com$/i;

    formDatos.addEventListener('submit', function (e) {
        e.preventDefault();

        const correo = document.getElementById('correo').value.trim();

        if (!CORREO_PROPIETARIO.test(correo)) {
            mensajeDatos.textContent = 'El correo debe ser institucional, terminado en @adminbarberlatino.com';
            return;
        }

        mensajeDatos.textContent = '';

        const nuevo = {
            nombre: document.getElementById('nombre').value.trim(),
            correo: correo,
            telefono: document.getElementById('telefono').value.trim(),
            notificaciones: perfil.notificaciones
        };
        localStorage.setItem(CLAVE_PERFIL, JSON.stringify(nuevo));
        window.location.href = 'perfil.html';
    });

    formSeguridad.addEventListener('submit', function (e) {
        e.preventDefault();
        const nueva = document.getElementById('contrasena-nueva').value;
        const confirmar = document.getElementById('contrasena-confirmar').value;

        if (nueva !== confirmar) {
            mensajeSeguridad.textContent = 'Las contraseñas no coinciden.';
            return;
        }
        mensajeSeguridad.textContent = 'Contraseña actualizada.';
        formSeguridad.reset();
    });
});
