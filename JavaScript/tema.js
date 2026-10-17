document.addEventListener('DOMContentLoaded', function () {

    const CLAVE_TEMA = 'temaBarberia';
    const boton = document.getElementById('boton_cambio');
    if (!boton) return;

    function aplicarTema(tema) {
        document.body.classList.toggle('modo-claro', tema === 'claro');
        boton.textContent = tema === 'claro' ? '🌙' : '☀️';
    }

    const temaGuardado = localStorage.getItem(CLAVE_TEMA) || 'oscuro';
    aplicarTema(temaGuardado);

    boton.addEventListener('click', function () {
        const temaActual = localStorage.getItem(CLAVE_TEMA) || 'oscuro';
        const nuevoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';
        localStorage.setItem(CLAVE_TEMA, nuevoTema);
        aplicarTema(nuevoTema);
    });
});
