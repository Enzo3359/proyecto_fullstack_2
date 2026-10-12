document.addEventListener('DOMContentLoaded', function() {

    const CLAVE_STORAGE = 'reservasBarberia'; // Misma clave que en reservas.js
    const listaReservas = document.getElementById('listaReservas');

    if (!listaReservas) {
        console.error('No se encontró el elemento id "listaReservas"');
        return;
    }

    function obtenerReservas() {
        const datos = localStorage.getItem(CLAVE_STORAGE);
        return datos ? JSON.parse(datos) : [];
    }

    function guardarReservas(reservas) {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(reservas));
    }

    function renderizarReservas() {
        const reservas = obtenerReservas();
        listaReservas.innerHTML = '';

        if (reservas.length === 0) {
            listaReservas.innerHTML = '<li>Todavía no tienes reservas.</li>';
            return;
        }

        reservas.forEach((reserva) => {
            const item = document.createElement('li');
            item.style.marginBottom = '12px';
            item.innerHTML = `
                <span>
                    <strong>${reserva.nombre}</strong> — ${reserva.servicio} con 
                    <strong>${reserva.barbero}</strong> el 
                    ${reserva.fecha} a las ${reserva.hora} hs. (Tel: ${reserva.telefono})
                </span>
                <button type="button" class="btn-cancelar" data-id="${reserva.id}" style="margin-left: 10px; cursor: pointer;">
                    Cancelar Cita
                </button>
            `;
            listaReservas.appendChild(item);
        });

        // Eventos para cancelar mediante el ID único de la reserva
        document.querySelectorAll('.btn-cancelar').forEach(boton => {
            boton.addEventListener('click', function () {
                if (!confirm('¿Seguro que quieres cancelar esta reserva?')) return;

                const idParaEliminar = Number(this.dataset.id);
                let reservasActuales = obtenerReservas();

                // Filtrar para quitar la reserva con ese ID
                reservasActuales = reservasActuales.filter(reserva => reserva.id !== idParaEliminar);

                guardarReservas(reservasActuales);
                renderizarReservas();

                alert('Reserva cancelada correctamente.');
            });
        });
    }

    renderizarReservas();
});