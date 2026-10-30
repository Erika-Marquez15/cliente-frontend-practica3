
async function obtenerDatos() {
    try {
        const respuesta = await fetch('http://localhost:3000/productos');

        if (!respuesta.ok) {
            throw new Error('Error al consultar la API REST');
        }

        const datos = await respuesta.json();

        console.log('Datos obtenidos de la API:', datos);

        // Seleccionar el contenedor de la tabla
        const contenedor = document.getElementById('tabla-datos');

        // Crear la estructura de la tabla
        let tabla = `
            <table border="1" cellpadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Recorrer los productos obtenidos
        datos.forEach(producto => {
            tabla += `
                <tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>$${producto.precio}</td>
                    <td>${producto.stock}</td>
                </tr>
            `;
        });

        // Cerrar la tabla
        tabla += `
                </tbody>
            </table>
        `;

        // Mostrar la tabla en la página
        contenedor.innerHTML = tabla;

        // Obtener nombres y cantidades de productos
        const nombres = datos.map(producto => producto.nombre);
        const cantidades = datos.map(producto => producto.stock);

        // Seleccionar el elemento canvas
        const canvas = document.getElementById('miGrafica');

        // Crear gráfica de barras
        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: nombres,
                datasets: [{
                    label: 'Cantidad disponible',
                    data: cantidades,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

obtenerDatos();
