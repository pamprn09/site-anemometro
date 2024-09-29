#include <LiquidCrystal.h> // Inclui a biblioteca para o LCD

// Definindo os pinos do LCD (caso não use o módulo I2C)
const int rs = 7, en = 8, d4 = 9, d5 = 10, d6 = 11, d7 = 12;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7); // Configura os pinos do LCD

// Definindo o pino de entrada analógica
const int windPin = A0; // Pino A0 conectado à saída do sensor

// Definindo a tensão máxima de saída do sensor
const float maxVoltage = 4.0; // Tensão máxima do sensor (4V)

// Definindo a velocidade do vento máxima correspondente em m/s
const float maxWindSpeed = 52.0; // Velocidade máxima do vento (32 m/s)

// Fator de conversão de m/s para km/h
const float conversionFactor = 3.6;

// Definindo os pinos para os LEDs
const int ledBranco = 2;  // LED para "Calmo"
const int ledAzul = 3;    // LED para "Leve"
const int ledVerde = 4;   // LED para "Médio"
const int ledAmarelo = 5; // LED para "Forte"

void setup() {
  // Inicializando a comunicação serial
  Serial.begin(9600);
  
  // Inicializando o LCD
  lcd.begin(16, 2); // Configura o LCD para 16 colunas e 2 linhas
  lcd.print("TEM VENTO?"); // Exibe um texto inicial no LCD
  
  // Configurando os pinos dos LEDs como saídas
  pinMode(ledBranco, OUTPUT);
  pinMode(ledAzul, OUTPUT);
  pinMode(ledVerde, OUTPUT);
  pinMode(ledAmarelo, OUTPUT);
  
  // Inicializando os LEDs como desligados
  digitalWrite(ledBranco, LOW);
  digitalWrite(ledAzul, LOW);
  digitalWrite(ledVerde, LOW);
  digitalWrite(ledAmarelo, LOW);
}

void loop() {
  // Ler o valor do sensor no pino analógico
  int sensorValue = analogRead(windPin);
  
  // Converter o valor lido (0 a 1023) para a tensão correspondente (0 a 5V)
  float voltage = sensorValue * (5.0 / 1023.0);
  
  // Converter a tensão lida na velocidade do vento em m/s
  float windSpeedMs = (voltage / maxVoltage) * maxWindSpeed;

  // Converter a velocidade do vento para km/h
  float windSpeedKmh = windSpeedMs * conversionFactor;

  // Enviar o valor da velocidade do vento em km/h via serial
  Serial.println(windSpeedKmh); // Agora envia a velocidade em km/h

  // Mover o cursor para a segunda linha e limpar o conteúdo anterior
  lcd.setCursor(0, 1);
  lcd.print("                "); // Limpa a linha (16 espaços)
  lcd.setCursor(0, 1); // Volta ao início da linha
  
  // Obter o tipo de vento e ligar o LED correspondente
  const char* windType = getWindType(windSpeedKmh);
  
  // Exibir a velocidade e o tipo de vento
  if (windSpeedKmh > 0) {
    lcd.print(windType); // Exibe o tipo de vento
     lcd.print("  ");
    lcd.print(windSpeedKmh, 0); // Exibe a velocidade em km/h com 0 casas decimais
    lcd.print("km/h");
    
  } else {
    lcd.print("NAO");
  }
  
  // Controlar os LEDs com base no tipo de vento
  controlLeds(windType);
  
  // Aguardar 1 segundo antes de fazer a próxima leitura
  delay(1000);
}

// Função para determinar o tipo de vento com base na velocidade
const char* getWindType(float speed) {
  if (speed >= 0 && speed < 1) return "CALMO";
  else if (speed >= 1 && speed < 12) return "BRISA";
  else if (speed >= 12 && speed < 29) return "MEDIO";
  else return "TEMPESTADE";
}

// Função para controlar os LEDs com base no tipo de vento
void controlLeds(const char* windType) {
  if (strcmp(windType, "CALMO") == 0) {
    digitalWrite(ledBranco, HIGH);
    digitalWrite(ledAzul, LOW);
    digitalWrite(ledVerde, LOW);
    digitalWrite(ledAmarelo, LOW);
  } else if (strcmp(windType, "BRISA") == 0) {
    digitalWrite(ledBranco, LOW);
    digitalWrite(ledAzul, HIGH);
    digitalWrite(ledVerde, LOW);
    digitalWrite(ledAmarelo, LOW);
  } else if (strcmp(windType, "MEDIO") == 0) {
    digitalWrite(ledBranco, LOW);
    digitalWrite(ledAzul, LOW);
    digitalWrite(ledVerde, HIGH);
    digitalWrite(ledAmarelo, LOW);
  } else { // Forte
    digitalWrite(ledBranco, LOW);
    digitalWrite(ledAzul, LOW);
    digitalWrite(ledVerde, LOW);
    digitalWrite(ledAmarelo, HIGH);
  }
}
