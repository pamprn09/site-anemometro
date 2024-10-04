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
```
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
```


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
Certifique-se de que o Arduino esteja corretamente configurado para medir a velocidade do vento com o anemômetro e que envie os dados via porta serial. O projeto assume que o Arduino está se comunicando via porta /dev/ttyUSB0 com uma taxa de baud de 9600. (Abaixo você encontra o passo a passo de setup do Arduino)

### Personalização
- **Hélice:** O comportamento da hélice (velocidade de rotação e cor) pode ser ajustado no arquivo /public/script.js.
- **Comunicação com o Arduino:** No arquivo /server/index.js, você pode ajustar a porta serial e a taxa de transmissão para corresponder à configuração do seu Arduino.

### Problemas conhecidos
- Verifique se o Arduino está conectado na porta serial correta.
- Se você estiver usando um sistema operacional que requer permissões especiais para acessar a porta serial, use sudo para conceder permissões ou configure as permissões de acesso à porta manualmente.
- Caso o WebSocket não funcione corretamente, verifique se o servidor Node.js está rodando sem erros e se o navegador tem suporte a WebSockets.


------


# Guia de Conexão do Anemômetro com Arduino e Display LCD

Este guia descreve o passo a passo para conectar um anemômetro ao Arduino e exibir as informações de velocidade do vento em um display LCD de 16x2.

## Componentes Necessários
- 1 x Arduino UNO
- 1 x Anemômetro (sensor de velocidade do vento)
- 1 x Display LCD 16x2
- 1 x Protoboard
- 1 x Potenciômetro de 10k (para ajustar o contraste do LCD)
- 1 x Resistor de 220 Ohms (para limitar a corrente dos LEDs)
- Fios jumper

## Conexões do Arduino e LCD
Conecte o display LCD ao Arduino utilizando os seguintes pinos:

| **Pino LCD** | **Pino Arduino** | **Descrição**          |
|--------------|------------------|------------------------|
| VSS          | GND              | Terra                  |
| VDD          | 5V               | Alimentação            |
| V0           | Potenciômetro    | Controle de contraste  |
| RS           | 7                | Seleção de registro    |
| RW           | GND              | Modo de escrita        |
| E            | 8                | Habilitar              |
| D4           | 9                | Dados (4 bits)         |
| D5           | 10               | Dados (4 bits)         |
| D6           | 11               | Dados (4 bits)         |
| D7           | 12               | Dados (4 bits)         |
| A (Anodo)    | 5V via resistor  | Alimentação do LED     |
| K (Cátodo)   | GND              | Terra do LED           |

### Circuito do LCD com Potenciômetro
1. Conecte o pino `V0` (pino 3 do LCD) ao pino central do potenciômetro para ajustar o contraste.
2. Conecte um dos terminais do potenciômetro ao `GND` e o outro ao `5V` do Arduino.

## Conexão do Anemômetro ao Arduino
O anemômetro possui três fios: 
- **VCC**: 5V (Alimentação)
- **GND**: GND (Terra)
- **Sinal**: Conecte ao pino analógico `A0` do Arduino.

### Resumo das Conexões do Anemômetro:
| **Fio Anemômetro** | **Pino Arduino** |
|--------------------|------------------|
| VCC                | 5V               |
| GND                | GND              |
| Sinal              | A0               |

## Código Arduino para Controle do Anemômetro e LCD

```cpp
#include <LiquidCrystal.h> // Inclui a biblioteca para o LCD

// Definindo os pinos do LCD
const int rs = 7, en = 8, d4 = 9, d5 = 10, d6 = 11, d7 = 12;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7); // Configura os pinos do LCD

// Definindo o pino de entrada analógica para o anemômetro
const int windPin = A0;

// Definindo a tensão máxima de saída do sensor
const float maxVoltage = 4.0; // Tensão máxima do sensor (4V)

// Definindo a velocidade do vento máxima correspondente em m/s
const float maxWindSpeed = 32.0;

// Fator de conversão de m/s para km/h
const float conversionFactor = 3.6;

void setup() {
  Serial.begin(9600); // Inicializa a comunicação serial
  lcd.begin(16, 2); // Configura o LCD para 16 colunas e 2 linhas
  lcd.print("TEM VENTO?"); // Exibe um texto inicial no LCD
}

void loop() {
  int sensorValue = analogRead(windPin); // Lê o valor do sensor
  float voltage = sensorValue * (5.0 / 1023.0); // Converte o valor lido para tensão
  float windSpeedMs = (voltage / maxVoltage) * maxWindSpeed; // Calcula a velocidade do vento em m/s
  float windSpeedKmh = windSpeedMs * conversionFactor; // Converte para km/h

  Serial.println(windSpeedKmh); // Exibe a velocidade no Serial Monitor

  lcd.setCursor(0, 1);
  lcd.print("                "); // Limpa a linha (16 espaços)
  lcd.setCursor(0, 1); // Volta ao início da linha

  if (windSpeedKmh > 0) {
      lcd.print(windSpeedKmh, 2); // Exibe a velocidade com 2 casas decimais
      lcd.print(" km/h");
  } else {
      lcd.print("NAO");
  }

  delay(1000); // Aguarda 1 segundo antes da próxima leitura
}

