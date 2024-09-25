const express = require('express');
const path = require('path');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const port = 3000;

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Comunicação com o Arduino via Serial
// Conectar diretamente à porta especificada
const serialPath = '/dev/tty.usbserial-A5069RR4'; // Porta serial do Arduino

console.log(`Conectando à porta: ${serialPath}`);

const serialPort = new SerialPort({ path: serialPath, baudRate: 9600 });

// Criar um parser para ler os dados da porta serial
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

let windSpeed = 0;

// Ler dados da porta serial (do Arduino)
parser.on('data', (data) => {
    console.log(data);
    windSpeed = parseFloat(data); // Recebe a velocidade do vento do Arduino
    console.log(`Velocidade do vento: ${windSpeed} m/s`);
});

// Enviar a velocidade do vento para o cliente via WebSocket
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})});

wss.on('connection', (ws) => {
    setInterval(() => {
        ws.send(JSON.stringify({ windSpeed }));
    }, 1000); // Enviar a cada segundo
});

serialPort.on('error', (err) => {
    console.error('Erro na comunicação com o Arduino:', err.message);
});
