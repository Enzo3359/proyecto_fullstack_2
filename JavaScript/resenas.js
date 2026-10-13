document.addEventListener('DOMContentLoaded', function() {

    const CLAVE_RESENAS = 'resenasBarberia';
    const formResena = document.getElementById('form-resena');
    const listaResenas = document.getElementById('lista-resenas');

    function obtenerResenas() {
        const datos = localStorage.getItem(CLAVE_RESENAS);
        return datos ? JSON.parse(datos) : [];
    }

    function guardarResenas(resenas) {
        localStorage.setItem(CLAVE_RESENAS, JSON.stringify(resenas));
    }

    function renderizarEstrellas(numero) {
        const cant = Number(numero) || 5;
        return '★'.repeat(cant) + '☆'.repeat(5 - cant);
    }

    function renderizarResenas() {
        if (!listaResenas) return;

        const resenas = obtenerResenas();
        listaResenas.innerHTML = '';

        if (resenas.length === 0) {
            listaResenas.innerHTML = '<p class="sin-resenas">Aún no hay reseñas. ¡Sé el primero en opinar!</p>';
            return;
        }

        resenas.forEach((resena) => {
            const card = document.createElement('article');
            card.className = 'reseña-card';

            const nombre = resena.nombre || resena.cliente || 'Anónimo';
            const calificacion = resena.calificacion || resena.estrellas || 5;
            const comentario = resena.comentario || resena.opinion || '';
            const fecha = resena.fecha || new Date().toISOString().split('T')[0];

            card.innerHTML = `
                <p><strong>${nombre}:</strong> ${renderizarEstrellas(calificacion)}</p>
                <blockquote>"${comentario}"</blockquote>
            `;
            

            listaResenas.appendChild(card);
        });
    }

    if (formResena) {
        formResena.addEventListener('submit', function(e) {
            e.preventDefault();

            const inputNombre = document.getElementById('nombre-resena') || document.getElementById('nombre');
            const inputCalificacion = document.getElementById('calificacion');
            const inputComentario = document.getElementById('comentario');

            const nombre = inputNombre ? inputNombre.value.trim() : '';
            const calificacion = inputCalificacion ? inputCalificacion.value : '5';
            const comentario = inputComentario ? inputComentario.value.trim() : '';

            if (!nombre || !comentario) {
                alert('Por favor completa tu nombre y comentario.');
                return;
            }

            const nuevaResena = {
                id: Date.now(),
                nombre: nombre,
                calificacion: calificacion,
                comentario: comentario,
                fecha: new Date().toISOString().split('T')[0]
            };

            const resenasActuales = obtenerResenas();
            resenasActuales.unshift(nuevaResena);
            guardarResenas(resenasActuales);

            formResena.reset();
            renderizarResenas();

            alert('¡Gracias por tu reseña!');
        });
    }

    renderizarResenas();
});