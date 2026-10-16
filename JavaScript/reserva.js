document.addEventListener('DOMContentLoaded', function(){ 
    
    const CLAVE_STORAGE = 'reservasBarberia';

    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').setAttribute('min', hoy);
    const confirmacion = document.getElementById('confirmacion');
    const listaReservas = document.getElementById('lista-reservas');

    function obtenerReservas() {
        const datos = localStorage.getItem(CLAVE_STORAGE);
        return datos ? JSON.parse(datos) : [];
    }

    function guardarReservas(reservas) {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(reservas));
    }

    const form = document.querySelector('form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const opciones = document.getElementById('opciones');
        const servicio = opciones.options[opciones.selectedIndex].text;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const barbero = document.querySelector('input[name="barbero"]:checked').value;

        if (nombre === '' || telefono === '' || opciones.value === '' || fecha === '' || hora === '' || barbero === '') {
        alert('Por favor completa todos los campos.');
        return;
        }

        const nuevaReserva = {id: Date.now(), nombre, telefono, servicio, fecha, hora, barbero };

        const reservas = obtenerReservas();
        reservas.push(nuevaReserva);
        guardarReservas(reservas);

        alert(`¡Gracias ${nombre}! Tu reserva fue registrada con éxito.`);

        form.reset();
        
    });
});
