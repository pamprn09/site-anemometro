const windSpeedElement = document.getElementById('wind-speed');
const blade = document.getElementById('blade');

// Conectar ao WebSocket para receber a velocidade do vento
const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(event);
    
    const windSpeed = parseFloat(data.windSpeed);

    // Verificar se windSpeed é um número válido
    if (!isNaN(windSpeed)) {
        // Atualizar a velocidade do vento no HTML
        windSpeedElement.textContent = windSpeed.toFixed(2);

        // Ajustar a rotação da hélice
        blade.style.animationDuration = (10 / (windSpeed + 1)) + 's';

        // Ajustar a cor da hélice de acordo com a velocidade do vento
        if (windSpeed < 3) {
            blade.style.backgroundColor = 'blue';
        } else if (windSpeed < 7) {
            blade.style.backgroundColor = 'yellow';
        } else {
            blade.style.backgroundColor = 'red';
        }
    } else {
        console.error('Valor inválido de windSpeed:', windSpeed);
        windSpeedElement.textContent = 'Dados inválidos';
    }
};
