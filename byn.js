async function fetchData() {
    const sheetId = 'TU_HOJA_DE_CALCULO_ID'; // Reemplaza con tu ID de hoja de cálculo
    const apiKey = 'TU_API_KEY'; // Reemplaza con tu clave API

    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Hoja1?key=${apiKey}`);
    const data = await response.json();
    
    return data.values;
}

async function createChart() {
    const data = await fetchData();
    const labels = data.slice(1).map(row => row[0]); // Asumiendo que la primera columna es de etiquetas
    const values = data.slice(1).map(row => row[1]); // Asumiendo que la segunda columna es de valores

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Datos de mi Hoja',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

createChart();
