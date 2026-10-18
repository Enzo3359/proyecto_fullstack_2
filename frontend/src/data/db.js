function leerColeccion(clave) {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : [];
}

function guardarColeccion(clave, coleccion) {
    localStorage.setItem(clave, JSON.stringify(coleccion));
}

export function crear(clave, item) {
    const coleccion = leerColeccion(clave);
    const nuevoItem = { id: Date.now(), ...item };
    coleccion.push(nuevoItem);
    guardarColeccion(clave, coleccion);
    return nuevoItem;
}

export function leerTodos(clave) {
    return leerColeccion(clave);
}

export function actualizar(clave, id, cambios) {
    const coleccion = leerColeccion(clave);
    const actualizada = coleccion.map(function (item) {
        return item.id === id ? { ...item, ...cambios } : item;
    });
    guardarColeccion(clave, actualizada);
    return actualizada.find(function (item) { return item.id === id; });
}

export function eliminar(clave, id) {
    const coleccion = leerColeccion(clave);
    const filtrada = coleccion.filter(function (item) { return item.id !== id; });
    guardarColeccion(clave, filtrada);
}
