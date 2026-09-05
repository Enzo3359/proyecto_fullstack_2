document.addEventListener('DOMContentLoaded', function () {

  
  document.querySelectorAll('nav a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function (e) {
      e.preventDefault();
      const destino = document.querySelector(this.getAttribute('href'));
      if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  
  const botonModo = document.getElementById('boton_cambio');
  botonModo.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
    botonModo.textContent = document.body.classList.contains('modo-oscuro') ? '☀️' : '🌙';
  });

  
  const form = document.querySelector('#formulario form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const opciones = document.getElementById('opciones').value;
    const fecha = document.getElementById('fecha').value;

    if (nombre === '' || telefono === '' || opciones === '' || fecha === '') {
      alert('Por favor completa todos los campos.');
    } else {
      alert('¡Gracias ' + nombre + '! Tu reserva fue registrada con éxito.');
      form.reset();
    }
  });

});



