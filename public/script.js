let isArduinoAvailable = true; // Altere para false se o Arduino não estiver disponível

function setWindSpeed(speed) {
    const bladeSim = document.getElementById('blade-sim');
    bladeSim.style.animationDuration = (10 / (speed + 1)) + 's';
    document.getElementById('wind-speed-sim').innerText = speed.toFixed(2);

    // Ajustar a cor da hélice de acordo com a velocidade do vento
    if (speed < 3) {
        bladeSim.style.backgroundColor = 'blue';
    } else if (speed < 7) {
        bladeSim.style.backgroundColor = 'yellow';
    } else {
        bladeSim.style.backgroundColor = 'red';
    }

    // Iniciar a animação
    bladeSim.style.animationPlayState = 'running';
}

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
    document.getElementById('wind-speed').innerText = speed.toFixed(2);
    const currentRow = document.querySelector(`tbody tr[data-speed="${speed}"]`);
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => row.style.backgroundColor = ''); // Resetar todas as cores
    if (currentRow) {
        currentRow.style.backgroundColor = 'lightyellow'; // Mudar a cor da linha atual
    }
}
