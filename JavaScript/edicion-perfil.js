document.addEventListener('DOMContentLoaded', function () {

    const CLAVE_PERFIL = 'perfilBarbero';
    const PERFIL_POR_DEFECTO = {
        nombre: 'Dylan Elgueta',
        correo: 'dy.elgueta@barberlatino.com',
        telefono: '+56 9 1234 5678',
        especialidad: 'Corte con Tijeras',
        notificaciones: true
    };

    function obtenerPerfil() {
        const datos = localStorage.getItem(CLAVE_PERFIL);
        return datos ? JSON.parse(datos) : PERFIL_POR_DEFECTO;
    }

    const perfil = obtenerPerfil();
    const formDatos = document.getElementById('form-datos');
    const formSeguridad = document.getElementById('form-seguridad');
    const mensaje = document.getElementById('mensaje-seguridad');

    // Los campos parten con los datos actuales
    document.getElementById('nombre').value = perfil.nombre;
    document.getElementById('correo').value = perfil.correo;
    document.getElementById('telefono').value = perfil.telefono;
    document.getElementById('especialidad').value = perfil.especialidad;

    const CORREO_BARBERO = /^[^\s@]+@barberlatino\.com$/i;
    const mensajeDatos = document.getElementById('mensaje-datos');

    formDatos.addEventListener('submit', function (e) {
        e.preventDefault();

        const correo = document.getElementById('correo').value.trim();

        if (!CORREO_BARBERO.test(correo)) {
            mensajeDatos.textContent = 'El correo debe ser institucional, terminado en @barberlatino.com';
            return;
        }

        mensajeDatos.textContent = '';

        const nuevo = {
            nombre: document.getElementById('nombre').value.trim(),
            correo: correo,
            telefono: document.getElementById('telefono').value.trim(),
            especialidad: document.getElementById('especialidad').value.trim(),
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
            mensaje.textContent = 'Las contraseñas no coinciden.';
            return;
        }
        // Simulación: la contraseña NO se guarda en ningún lado
        mensaje.textContent = 'Contraseña actualizada.';
        formSeguridad.reset();
    });
});