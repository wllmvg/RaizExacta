function evaluarFuncion(funcStr, x) {
    return eval(funcStr.replace(/x/g, `(${x})`));
}

function derivadaNumerica(funcStr, x, h = 0.000001) {
    return (evaluarFuncion(funcStr, x + h) - evaluarFuncion(funcStr, x - h)) / (2 * h);
}

function calcularNewtonRaphson() {
    const funcStr = document.getElementById('funcion').value;
    let x0 = parseFloat(document.getElementById('x0').value);
    const tolerancia = parseFloat(document.getElementById('tolerancia').value);
    const maxIter = parseInt(document.getElementById('maxIter').value);
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ''; // Limpiar resultados previos

    for (let i = 0; i < maxIter; i++) {
        let f_x0 = evaluarFuncion(funcStr, x0);
        let deriv_f_x0 = derivadaNumerica(funcStr, x0);

        if (Math.abs(deriv_f_x0) < 1e-10) {
            resultadoDiv.innerHTML += `<p>Iteración ${i + 1}: La derivada es muy pequeña, el método falla.</p>`;
            return;
        }

        let x1 = x0 - f_x0 / deriv_f_x0;

        resultadoDiv.innerHTML += `<p>Iteración ${i + 1}: x = ${x1.toFixed(6)}</p>`;

        if (Math.abs(x1 - x0) < tolerancia) {
            resultadoDiv.innerHTML += `<p>Convergencia alcanzada en la iteración ${i + 1} con x = ${x1.toFixed(6)}</p>`;
            return;
        }

        x0 = x1;
    }

    resultadoDiv.innerHTML += `<p>No se alcanzó la convergencia después de ${maxIter} iteraciones.</p>`;
}
