document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const mensaje = document.getElementById('mensaje-registro');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const contrasena = document.getElementById('contraseña').value;

        if (buscarUsuarioPorCorreo(correo)) {
            mensaje.textContent = 'Ya existe una cuenta registrada con ese correo.';
            return;
        }

        const rol = obtenerRolPorCorreo(correo);

        const usuarios = obtenerUsuarios();
        usuarios.push({ nombre, correo, contrasena, rol });
        guardarUsuarios(usuarios);

        mensaje.textContent = '';
        redirigirSegunRol(rol);
    });
});
