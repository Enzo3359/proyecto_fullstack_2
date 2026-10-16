document.addEventListener('DOMContentLoaded', function () {

    // CAMBIO 1: otra clave de localStorage
    const CLAVE_RESERVAS = 'reservasBarberia';
    const tabla = document.getElementById('tabla-reservas');

    function obtenerReservas() {
        const datos = localStorage.getItem(CLAVE_RESERVAS);
        return datos ? JSON.parse(datos) : [];
    }

    const reservas = obtenerReservas();

    if (reservas.length === 0) {
        // CAMBIO 3: la tabla tiene 5 columnas y no hay botón eliminar
        tabla.innerHTML = '<tr><td colspan="5">No hay reservas registradas.</td></tr>';
        return;
    }

    reservas.forEach(function (reserva) {
        const fila = document.createElement('tr');
        // CAMBIO 2: aquí el cliente se llama "nombre". El "|| '-'" cubre reservas viejas sin hora o barbero.
        fila.innerHTML = `
            <td>${reserva.nombre}</td>
            <td>${reserva.servicio}</td>
            <td>${reserva.barbero || '-'}</td>
            <td>${reserva.fecha}</td>
            <td>${reserva.hora || '-'}</td>
        `;
        tabla.appendChild(fila);
    });
});