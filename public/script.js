let isArduinoAvailable = true; // Altere para false se o Arduino não estiver disponível
let currentArduinoSpeed = 0; // Velocidade atual do Arduino
let currentHelixSpeed = 0; // Velocidade atual da hélice

function setWindSpeed(speed) {
    const blade = document.querySelector('.petal-wrap'); // Seleciona o contêiner das pétalas do cata-vento

    // A duração da animação deve ser menor para ventos mais fortes
    blade.style.animationDuration = (5 / (speed + 1)) + 's'; // Ajuste este valor para tornar a animação mais rápida
    document.getElementById('wind-speed-sim').innerText = speed.toFixed(2); // Atualiza o display da velocidade do vento

    // Iniciar a animação se a velocidade for maior que zero
    if (speed > 0) {
        blade.style.animationPlayState = 'running'; // Inicia a animação
    } else {
        blade.style.animationPlayState = 'paused'; // Pausa a animação se a velocidade for zero
    }
}

// Certifique-se de definir a animação como pausada inicialmente
document.addEventListener('DOMContentLoaded', () => {
    const blade = document.querySelector('.petal-wrap');
    blade.style.animationPlayState = 'paused'; // Garante que a hélice comece parada
});

// Função para alternar entre as abas
document.querySelectorAll('#tabs li').forEach(tab => {
    tab.addEventListener('click', () => {
        const isArduinoTab = tab.id === 'arduino-tab';
        document.getElementById('arduino-content').style.display = isArduinoTab ? 'block' : 'none';
        document.getElementById('helix-content').style.display = isArduinoTab ? 'none' : 'block';

        // Mudar a cor da aba
        tab.classList.add('active');
        document.getElementById(isArduinoTab ? 'helix-tab' : 'arduino-tab').classList.remove('active');

        // Desativar a aba do Arduino se não estiver disponível
        if (!isArduinoAvailable) {
            document.getElementById('arduino-tab').style.backgroundColor = 'lightgray';
            document.getElementById('arduino-tab').style.pointerEvents = 'none';
        }
    });
});

// Função para atualizar a exibição do Arduino
function updateArduinoData(speed) {
    currentArduinoSpeed = speed; // Atualiza a velocidade do Arduino
    document.getElementById('wind-speed').innerText = speed.toFixed(2);
    const currentRow = document.querySelector(`tbody tr[data-speed="${speed}"]`);
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => row.style.backgroundColor = ''); // Resetar todas as cores
    if (currentRow) {
        currentRow.style.backgroundColor = 'lightyellow'; // Mudar a cor da linha atual
    }

    // Atualizar a rotação e cor do cata-vento na aba Arduino
    setWindSpeed(speed);
}

// Simulação de atualização de dados do Arduino
function simulateArduinoData() {
    setInterval(() => {
        // Gera uma velocidade aleatória entre 0 e 18
        const randomSpeed = Math.floor(Math.random() * 19);
        updateArduinoData(randomSpeed);
    }, 1000); // Atualiza a cada segundo
}

// Função para definir a velocidade do vento na aba Hélice
function setHelixWindSpeed(speed) {
    currentHelixSpeed = speed; // Atualiza a velocidade da hélice
    setWindSpeed(speed); // Atualiza a animação do cata-vento na aba Hélice
}

// Listener para o botão na aba Hélice
document.getElementById('helix-button').addEventListener('click', () => {
    // Aqui você pode definir a lógica para pegar a velocidade desejada
    const userSpeed = parseFloat(document.getElementById('helix-speed-input').value) || 0; // Supondo que você tenha um input
    setHelixWindSpeed(userSpeed); // Define a velocidade para o cata-vento da aba Hélice
});

// Adiciona o listener do DOMContentLoaded para garantir que tudo esteja carregado antes de executar
document.addEventListener('DOMContentLoaded', () => {
    // Inicia a simulação
    if (isArduinoAvailable) {
        simulateArduinoData();
    }
});
