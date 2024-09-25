#include <LiquidCrystal.h> // Inclui a biblioteca para o LCD

// Definindo os pinos do LCD (caso não use o módulo I2C)
const int rs = 7, en = 8, d4 = 9, d5 = 10, d6 = 11, d7 = 12;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7); // Configura os pinos do LCD

// Definindo o pino de entrada analógica
const int windPin = A0; // Pino A0 conectado à saída do sensor

// Verifique o datasheet do sensor para ajustar esses valores:
const float maxVoltage = 5.0; // Ajustado para 5V (valor típico)
const float maxWindSpeed = 32.0; // Ajustado para 32 m/s (valor típico de sensores de vento)

// Fator de conversão de m/s para km/h
const float conversionFactor = 3.6;

void setup() {
  // Inicializando a comunicação serial
  Serial.begin(9600);
  
  // Inicializando o LCD
  lcd.begin(16, 2); // Configura o LCD para 16 colunas e 2 linhas
  lcd.print("TEM VENTO?"); // Exibe um texto inicial no LCD
}

void loop() {
  // Ler o valor do sensor no pino analógico
  int sensorValue = analogRead(windPin);
  
  // Converter o valor lido (0 a 1023) para a tensão correspondente (0 a 5V)
  float voltage = sensorValue * (12.0 / 1023.0); // Agora assumindo tensão máxima de 5V
  
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
  
  // Exibir a velocidade ou "NAO" se não houver vento
  if (windSpeedKmh > 0) {
    lcd.print(windSpeedKmh, 2); // Exibe a velocidade em km/h com 2 casas decimais
    lcd.print(" km/h");
  } else {
    lcd.print("NAO");
  }
  
  // Aguardar 1 segundo antes de fazer a próxima leitura
  delay(1000);
}
