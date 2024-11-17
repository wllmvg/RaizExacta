// script.js

// Función que calcula la derivada de la función f(x)
function calcularDerivada(funcion) {
    try {
        const derivada = math.derivative(funcion, 'x');
        return derivada.toString();
    } catch (error) {
        console.error('Error al calcular la derivada:', error);
        return null;
    }
}

// Método de Newton-Raphson para encontrar la raíz
function newtonRaphson(funcion, x0, tol = 1e-6) {
    let x = x0;
    let iter = 0;
    const resultados = [];

    while (true) {
        // Evaluamos f(x) y f'(x) en el valor de x
        const fx = math.evaluate(funcion, { x: x });
        const dfxStr = calcularDerivada(funcion);
        
        if (dfxStr === null) {
            console.error("No se pudo calcular la derivada.");
            return null;
        }

        const dfx = math.evaluate(dfxStr, { x: x });

        // Si la derivada es muy pequeña, evitamos la división por cero
        if (math.abs(dfx) < 1e-12) {
            console.error('La derivada es demasiado pequeña, no puede calcularse.');
            return null;
        }

        // Aplicamos la fórmula de Newton-Raphson
        const xNuevo = x - fx / dfx;

        // Redondeamos xNuevo a 4 decimales
        const xNuevoRedondeado = math.round(xNuevo, 4);

        // Guardamos los resultados de esta iteración
        resultados.push({
            iter: iter + 1,
            x: x,
            fx: fx,
            dfx: dfx,
            xNuevo: xNuevoRedondeado
        });

        // Comparamos los valores de x y xNuevo redondeados a 4 decimales
        if (math.abs(xNuevoRedondeado - x) < 1e-4) {
            const raiz = xNuevoRedondeado;
            return { raiz, resultados };
        }

        // Actualizamos el valor de x para la siguiente iteración
        x = xNuevoRedondeado;
        iter++;
    }
}

// Función para manejar el formulario
document.getElementById('calc-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevenimos que el formulario recargue la página

    // Obtener los valores introducidos en el formulario
    const funcion = document.getElementById('funcion').value;
    const x0 = parseFloat(document.getElementById('x0').value);

    // Verificar que los valores sean válidos
    if (!funcion || isNaN(x0)) {
        alert('Por favor, ingrese una función y un valor inicial válidos.');
        return;
    }

    // Ejecutar el método de Newton-Raphson
    const { raiz, resultados } = newtonRaphson(funcion, x0);

    // Mostrar el resultado de la raíz
    const raizElement = document.getElementById('raiz');
    if (raiz !== null) {
        raizElement.textContent = `Raíz aproximada: ${raiz.toFixed(4)}`;  // Redondear a 4 decimales
    } else {
        raizElement.textContent = 'No se pudo calcular la raíz.';
    }

    // Limpiar la tabla de resultados antes de agregar nuevos datos
    const tablaResultados = document.getElementById('tabla-resultados');
    tablaResultados.innerHTML = '';  // Eliminar los resultados anteriores

    // Eliminar las últimas 2 iteraciones de los resultados
    const iteracionesMostradas = resultados.slice(0, -1); // Quitamos las dos últimas iteraciones

    // Solo agregar las filas de las iteraciones necesarias
    // Nos detenemos cuando lleguemos a la raíz
    iteracionesMostradas.forEach(result => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${result.iter}</td>
            <td>${result.x}</td>
            <td>${result.fx}</td>
            <td>${result.dfx}</td>
            <td>${result.xNuevo}</td>
        `;
        tablaResultados.appendChild(fila);
    });
});
