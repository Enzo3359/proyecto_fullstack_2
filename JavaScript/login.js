document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const mensaje = document.getElementById('mensaje-login');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const correo = document.getElementById('correo').value.trim();
        const contrasena = document.getElementById('contrasena').value;

        const usuario = buscarUsuarioPorCorreo(correo);

        if (!usuario) {
            mensaje.textContent = 'No existe una cuenta con ese correo. Regístrate primero.';
            return;
        }

        if (usuario.contrasena !== contrasena) {
            mensaje.textContent = 'Contraseña incorrecta.';
            return;
        }

        mensaje.textContent = '';
        redirigirSegunRol(usuario.rol);
    });
});
