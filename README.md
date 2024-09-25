## Projeto Anemômetro

Este projeto cria um site em HTML5 que interage com um anemômetro (medidor de velocidade do vento) controlado por um Arduino. O site exibe a velocidade do vento em tempo real e uma hélice que gira de acordo com a velocidade captada. A cor da hélice muda conforme a intensidade do vento: azul para vento fraco e vermelho para vento forte.

### Funcionalidades:
- Exibe a velocidade do vento em metros por segundo (m/s).
- Uma hélice animada que gira conforme a velocidade do vento.
- Transição de cor da hélice (azul para vento lento, amarelo para vento moderado, e vermelho para vento rápido).
- Comunicação em tempo real com o Arduino via WebSockets.

### Tecnologias utilizadas:
- **HTML5** e **CSS3** para a interface do usuário.
- **JavaScript** para a animação e comunicação com o servidor.
- **Node.js** para o backend, comunicação com o Arduino e servidor WebSocket.
- **Arduino** para capturar os dados da velocidade do vento e enviá-los via porta serial.
- **SerialPort** (Node.js) para comunicação serial com o Arduino.

## Requisitos

- [Node.js](https://nodejs.org/) instalado.
- Arduino com o anemômetro configurado.
- Biblioteca [SerialPort](https://serialport.io/) para comunicação com o Arduino.
- Permissão de acesso à porta serial (`/dev/ttyUSB0` ou outra porta que o Arduino utiliza).

## Estrutura do projeto

/anemometro
├── /public          # Arquivos acessíveis pelo navegador
│   ├── index.html   # O arquivo principal do site
│   ├── style.css    # Arquivo CSS para estilização
│   └── script.js    # Arquivo JavaScript para interações
├── /server          # Código do servidor Node.js
│   └── index.js     # Arquivo principal do servidor
├── /arduino         # Código do Arduino (opcional)
├── package.json     # Arquivo de configuração do Node.js
├── install.sh       # Script de instalação
└── README.md        # Instruções do projeto


## Instalação

Siga os passos abaixo para configurar o projeto em sua máquina local:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/anemometro.git
   ````

2. **Acesse o diretório do projeto**:
    ```cd anemometro```

3. **Torne o script de instalação executável**:
    chmod +x install.sh

4. **Execute o script de instalação**:
    ./install.sh

5. **Acesse o site:**
    Abra seu navegador e acesse: `http://localhost:3000`

## Configuração do Arduino
Certifique-se de que o Arduino esteja corretamente configurado para medir a velocidade do vento com o anemômetro e que envie os dados via porta serial. O projeto assume que o Arduino está se comunicando via porta /dev/ttyUSB0 com uma taxa de baud de 9600.

### Personalização
- **Hélice:** O comportamento da hélice (velocidade de rotação e cor) pode ser ajustado no arquivo /public/script.js.
- **Comunicação com o Arduino:** No arquivo /server/index.js, você pode ajustar a porta serial e a taxa de transmissão para corresponder à configuração do seu Arduino.

### Problemas conhecidos
- Verifique se o Arduino está conectado na porta serial correta.
- Se você estiver usando um sistema operacional que requer permissões especiais para acessar a porta serial, use sudo para conceder permissões ou configure as permissões de acesso à porta manualmente.
- Caso o WebSocket não funcione corretamente, verifique se o servidor Node.js está rodando sem erros e se o navegador tem suporte a WebSockets.
