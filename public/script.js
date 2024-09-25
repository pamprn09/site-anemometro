const windSpeedElement = document.getElementById('wind-speed');
const blade = document.getElementById('blade');
const tableRows = document.querySelectorAll('#beaufort-scale tbody tr');
const helixBlade = document.getElementById('helix-blade');
const arduinoTabButton = document.querySelector('.tab-button.active'); // Seleciona a aba do Arduino

// Simulação da disponibilidade do Arduino
let isArduinoAvailable = false; // Mude para true se o Arduino estiver disponível

// Conectar ao WebSocket para receber a velocidade do vento
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
    if (isArduinoAvailable) {
        // Se o Arduino estiver disponível, habilita a aba
        arduinoTabButton.classList.remove('inactive');
        arduinoTabButton.onclick = () => openTab('arduino');
    } else {
        // Se não, desabilita a aba
        arduinoTabButton.classList.add('inactive');
        arduinoTabButton.onclick = null; // Remove a ação de clique
    }
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const windSpeed = data.windSpeed || 0;

    // Atualizar a velocidade do vento no HTML
    windSpeedElement.textContent = windSpeed.toFixed(2);

    // Ajustar a rotação da hélice
    blade.style.animationDuration = (10 / (windSpeed + 1)) + 's';

    // Ajustar a cor da hélice de acordo com a velocidade do vento
    updateHelixColor(windSpeed);

    // Destacar a linha correspondente na tabela
    tableRows.forEach(row => {
        const speed = parseFloat(row.getAttribute('data-speed'));
        if (windSpeed < speed) {
            row.classList.add('highlight');
        } else {
            row.classList.remove('highlight');
        }
    });
};

// Função para abrir a aba
function openTab(tabName) {
    if (tabName === 'arduino' && !isArduinoAvailable) {
        return; // Não faz nada se o Arduino não estiver disponível
    }

    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
    document.querySelector(`.tab-button[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// Função para ajustar a cor da hélice
function updateHelixColor(speed) {
    if (speed < 3) {
        blade.style.backgroundColor = 'blue';
    } else if (speed < 7) {
        blade.style.backgroundColor = 'yellow';
    } else {
        blade.style.backgroundColor = 'red';
    }
}

// Função para ajustar a hélice com base na velocidade do vento selecionada
function setWindSpeed(speed) {
    console.log('setWindSpeed' + speed);
    const blade = document.getElementById('blade');
    blade.style.animationDuration = (10 / (speed + 1)) + 's';

    // Ajustar a cor da hélice de acordo com a velocidade do vento
    if (speed < 3) {
        blade.style.backgroundColor = 'blue';
    } else if (speed < 7) {
        blade.style.backgroundColor = 'yellow';
    } else {
        blade.style.backgroundColor = 'red';
    }

    // Iniciar a animação
    blade.style.animationPlayState = 'running';
}