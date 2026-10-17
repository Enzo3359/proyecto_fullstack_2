document.addEventListener('DOMContentLoaded', function () {

    const CLAVE_CORTES = 'cortesBarberia';
    const CLAVE_RESERVAS = 'reservasBarberia';

    function obtenerCortes() {
        const datos = localStorage.getItem(CLAVE_CORTES);
        return datos ? JSON.parse(datos) : [];
    }

    function obtenerReservas() {
        const datos = localStorage.getItem(CLAVE_RESERVAS);
        return datos ? JSON.parse(datos) : [];
    }

    function formatearCLP(numero) {
        return '$' + Number(numero).toLocaleString('es-CL');
    }

    const cortes = obtenerCortes();
    const reservas = obtenerReservas();

    const totalIngresos = cortes.reduce((suma, corte) => suma + Number(corte.importe), 0);
    const totalReservas = reservas.length;
    const totalCortes = cortes.length;

    const barberosActivos = new Set();
    cortes.forEach(function (corte) { barberosActivos.add(corte.barbero); });
    reservas.forEach(function (reserva) { barberosActivos.add(reserva.barbero); });

    document.getElementById('ingresos-totales').textContent = formatearCLP(totalIngresos);
    document.getElementById('reservas-totales').textContent = totalReservas;
    document.getElementById('barberos-activos').textContent = barberosActivos.size;
    document.getElementById('cortes-realizados').textContent = totalCortes;

    const tablaRendimiento = document.getElementById('tabla-rendimiento');

    if (barberosActivos.size === 0) {
        tablaRendimiento.innerHTML = '<tr><td colspan="4">Aún no hay actividad registrada.</td></tr>';
        return;
    }

    tablaRendimiento.innerHTML = '';

    barberosActivos.forEach(function (nombreBarbero) {
        const cortesDelBarbero = cortes.filter(function (c) { return c.barbero === nombreBarbero; });
        const reservasDelBarbero = reservas.filter(function (r) { return r.barbero === nombreBarbero; });
        const ingresosDelBarbero = cortesDelBarbero.reduce(function (suma, c) { return suma + Number(c.importe); }, 0);

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${nombreBarbero}</td>
            <td>${cortesDelBarbero.length}</td>
            <td>${reservasDelBarbero.length}</td>
            <td>${formatearCLP(ingresosDelBarbero)}</td>
        `;
        tablaRendimiento.appendChild(fila);
    });
});
