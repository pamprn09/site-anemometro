let isArduinoAvailable = true; // Altere para false se o Arduino não estiver disponível

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
    document.getElementById('wind-speed').innerText = speed.toFixed(2);
    const currentRow = document.querySelector(`tbody tr[data-speed="${speed}"]`);
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => row.style.backgroundColor = ''); // Resetar todas as cores
    if (currentRow) {
        currentRow.style.backgroundColor = 'lightyellow'; // Mudar a cor da linha atual
    }

    // Atualizar a rotação e cor do cata-vento
    setWindSpeed(speed);
}

// Adiciona o listener do DOMContentLoaded para garantir que tudo esteja carregado antes de executar
document.addEventListener('DOMContentLoaded', () => {
    // Qualquer inicialização adicional pode ser colocada aqui, se necessário
});
