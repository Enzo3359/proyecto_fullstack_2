document.addEventListener('DOMContentLoaded', function () {

  // ---- Navegación con scroll suave ----
  document.querySelectorAll('nav a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function (e) {
      e.preventDefault();
      const destino = document.querySelector(this.getAttribute('href'));
      destino.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ---- Modo claro/oscuro ----
  const botonModo = document.getElementById('boton_cambio');
  botonModo.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
    botonModo.textContent = document.body.classList.contains('modo-oscuro') ? '☀️' : '🌙';
  });

  // ---- Reservas con localStorage ----
  const CLAVE_STORAGE = 'reservasBarberia';

  const form = document.querySelector('#formulario form');
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

  function renderizarReservas() {
    const reservas = obtenerReservas();
    listaReservas.innerHTML = '';

    if (reservas.length === 0) {
      listaReservas.innerHTML = '<li>Todavía no tienes reservas.</li>';
      return;
    }

    reservas.forEach((reserva, indice) => {
      const item = document.createElement('li');
      item.innerHTML = `
        <strong>${reserva.nombre}</strong> — ${reserva.servicio} — ${reserva.fecha} — ${reserva.telefono}
        <button type="button" class="btn-cancelar" data-indice="${indice}">Cancelar</button>
      `;
      listaReservas.appendChild(item);
    });

     document.querySelectorAll('.btn-cancelar').forEach(boton => {
      boton.addEventListener('click', function () {
        if (!confirm('¿Seguro que quieres cancelar esta reserva?')) return;

        const reservas = obtenerReservas();
        reservas.splice(Number(this.dataset.indice), 1);
        guardarReservas(reservas);
        renderizarReservas();

        alert('Reserva cancelada correctamente.');
      });
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const opciones = document.getElementById('opciones');
    const servicio = opciones.options[opciones.selectedIndex].text;
    const fecha = document.getElementById('fecha').value;

    if (nombre === '' || telefono === '' || opciones.value === '' || fecha === '') {
      alert('Por favor completa todos los campos.');
      return;
    }

    const nuevaReserva = { nombre, telefono, servicio, fecha };

    const reservas = obtenerReservas();
    reservas.push(nuevaReserva);
    guardarReservas(reservas);

    alert(`¡Gracias ${nombre}! Tu reserva fue registrada con éxito.`);

    form.reset();
    renderizarReservas();
  });

  renderizarReservas();

});



