document.addEventListener('DOMContentLoaded', function () {

    const CLAVE_CORTES = 'cortesBarberia';

    function obtenerCortes() {
        const datos = localStorage.getItem(CLAVE_CORTES);
        return datos ? JSON.parse(datos) : [];
    }

    function formatearCLP(numero) {
        return '$' + Number(numero).toLocaleString('es-CL');
    }

    const cortes = obtenerCortes();

    const elIngresosTotales = document.getElementById('ingresos-totales');
    const elCortesRealizados = document.getElementById('cortes-realizados');
    const elTicketPromedio = document.getElementById('ticket-promedio');
    const tablaBarberos = document.getElementById('tabla-ingresos-barbero');

    const totalIngresos = cortes.reduce((suma, corte) => suma + Number(corte.importe), 0);
    const totalCortes = cortes.length;
    const ticketPromedio = totalCortes > 0 ? totalIngresos / totalCortes : 0;

    elIngresosTotales.textContent = formatearCLP(totalIngresos);
    elCortesRealizados.textContent = totalCortes;
    elTicketPromedio.textContent = formatearCLP(Math.round(ticketPromedio));

    if (totalCortes === 0) {
        tablaBarberos.innerHTML = '<tr><td colspan="3">No hay cortes registrados aún.</td></tr>';
        return;
    }

    const resumenPorBarbero = {};

    cortes.forEach(function (corte) {
        const nombreBarbero = corte.barbero;
        if (!resumenPorBarbero[nombreBarbero]) {
            resumenPorBarbero[nombreBarbero] = { cortes: 0, ingresos: 0 };
        }
        resumenPorBarbero[nombreBarbero].cortes += 1;
        resumenPorBarbero[nombreBarbero].ingresos += Number(corte.importe);
    });

    tablaBarberos.innerHTML = '';

    Object.keys(resumenPorBarbero).forEach(function (nombreBarbero) {
        const datos = resumenPorBarbero[nombreBarbero];
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${nombreBarbero}</td>
            <td>${datos.cortes}</td>
            <td>${formatearCLP(datos.ingresos)}</td>
        `;
        tablaBarberos.appendChild(fila);
    });
});
