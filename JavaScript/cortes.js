document.addEventListener('DOMContentLoaded', function () {

    const CLAVE_CORTES = 'cortesBarberia';
    const formCorte = document.getElementById('form-corte');
    const tablaCortes = document.getElementById('tabla-cortes');

    // 1. Obtener cortes del localStorage
    function obtenerCortes() {
        const datos = localStorage.getItem(CLAVE_CORTES);
        return datos ? JSON.parse(datos) : [];
    }

    // Guardar en localStorage
    function guardarCortes(cortes) {
        localStorage.setItem(CLAVE_CORTES, JSON.stringify(cortes));
    }

    // 2. Renderizar las filas dentro del <tbody>
    function renderizarCortes() {
        if (!tablaCortes) return;

        const cortes = obtenerCortes();
        tablaCortes.innerHTML = '';

        if (cortes.length === 0) {
            tablaCortes.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; color: #888;">No hay cortes registrados aún.</td>
                </tr>
            `;
            return;
        }

        cortes.forEach((corte) => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td><strong>${corte.cliente}</strong></td>
                <td>${corte.servicio}</td>
                <td>${corte.barbero}</td>
                <td>${corte.fecha}</td>
                <td style="color: #f59e0b; font-weight: bold;">$${Number(corte.importe).toLocaleString('es-CL')}</td>
                <td>
                    <button type="button" class="btn-eliminar-corte" data-id="${corte.id}">
                        Eliminar
                    </button>
                </td>
            `;

            tablaCortes.appendChild(fila);
        });

        // Eventos para eliminar registros
        document.querySelectorAll('.btn-eliminar-corte').forEach(boton => {
            boton.addEventListener('click', function () {
                if (!confirm('¿Seguro que deseas eliminar este registro de corte?')) return;

                const idEliminar = Number(this.dataset.id);
                let cortesActuales = obtenerCortes();

                cortesActuales = cortesActuales.filter(item => item.id !== idEliminar);
                guardarCortes(cortesActuales);
                renderizarCortes();
            });
        });
    }

    // 3. Registrar nuevo corte
    if (formCorte) {
        formCorte.addEventListener('submit', function (e) {
            e.preventDefault();

            const cliente = document.getElementById('cliente').value.trim();
            const servicio = document.getElementById('tipo-servicio').value;
            const barbero = document.getElementById('barbero').value.trim();
            const fechaInput = document.getElementById('fecha').value;
            const importe = document.getElementById('importe').value;

            if (!cliente || !servicio || !barbero || !fechaInput || !importe) {
                alert('Por favor completa todos los campos.');
                return;
            }

            // Crear objeto con propiedades coherentes con el HTML
            const nuevoCorte = {
                id: Date.now(),
                cliente: cliente,
                servicio: servicio,
                barbero: barbero,
                fecha: fechaInput,
                importe: Number(importe)
            };

            const cortes = obtenerCortes();
            cortes.unshift(nuevoCorte); // Insertar al inicio de la tabla
            guardarCortes(cortes);

            formCorte.reset();
            renderizarCortes();

            alert('¡Corte registrado con éxito!');
        });
    }

    // Dibujar la tabla al cargar la página
    renderizarCortes();
});