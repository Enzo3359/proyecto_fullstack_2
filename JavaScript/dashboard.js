document.addEventListener('DOMContentLoaded', function(){

    const CLAVE_CORTES = 'cortesBarberia';

    // 1. Obtener cortes del localStorage
    function obtenerCortes() {
        const datos = localStorage.getItem(CLAVE_CORTES);
        return datos ? JSON.parse(datos) : [];
    }

    const cortes = obtenerCortes();

    // 1) Total de cortes
    document.getElementById('total-cortes').textContent = cortes.length;

    // 2) Total de ingresos (el patrón de acumular)
    let totalIngresos = 0;
    cortes.forEach(function (corte) {
        totalIngresos = totalIngresos + Number(corte.importe);
    });
    document.getElementById('total-ingresos').textContent =
        '$' + totalIngresos.toLocaleString('es-CL');

    // 3) Últimos cortes (los 5 más recientes)
    const contenedor = document.getElementById('ultimos-cortes');
    const ultimos = cortes.slice(0, 5);

    if (ultimos.length === 0) {
        contenedor.innerHTML = '<tr><td colspan="4">Aún no hay cortes registrados.</td></tr>';
        return;
    }

    ultimos.forEach(function (corte) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${corte.cliente}</td>
            <td>${corte.servicio}</td>
            <td>${corte.fecha}</td>
            <td>$${Number(corte.importe).toLocaleString('es-CL')}</td>
        `;
        contenedor.appendChild(fila);
    });

});