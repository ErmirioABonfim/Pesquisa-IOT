//const express = require('express');
//const socketIo = require('socket.io');
//const http = require('http');


const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http); //
/* Step 01 > Criando a constante app importando da bilioteca express
Step 02 > Criando constante http importando da biblioteca htttp,
já utilizando a função createServer e passando o parâmetro de app,
assim o servidor foi criado.
Step 03 > Criado constante io importando da biblioteca socket.io passando o parâmetro http
que indica em qual servidor ele irá atuar.
*/

io.on('connection', function (socket) {
  console.log('Um novo socket conectado');
});
/*  Step 01 > Iniciado a conexão com o socket que trasmitirá as informações.
Step 02 > Console.log informará se a página conseguiu conectar ao socket informando
Um novo socket conectado.
*/

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});
/* Step 01 > Utilizando a função get que a classe app herdou de express ao
importarmos para ela na linha 6. Passamos os parâmetros de requisição, resposto
e next.
Step 02 > Informamos o diretório onde está nossa págin com as informações.

*/

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
/* Step 01 > Criamos a constante SerialPort com os dados de serialport por meio de importação.
Step 02 > Criamos a constante Readline importando agora da nossa classe SerialPort a função Readline
Step 03 > Criamos a constante parser para armazenar a leitura da porta serial instanciando a função
Readline.
*/

const mySerial = new SerialPort('COM1', {
  baudRate:9600
});
/* Criamos a constante mySerial instanciando da biblioteca SerialPort e Passamos
os parâmetros da porta de comunicação: COM1 e da velocidade de comunicação baudRate:9600.
*/

mySerial.on('open', function() {
  console.log('Porta serial aberta!');
});
/* Utilizando a função on da clase mySerial que foi instanciada na linha 44,
está função liga a porta serial e em caso de sucesso informará com a mensagem:
Porta serial aberta.
*/

mySerial.on('data', function(data){
  console.log(data.toString());
  io.emit('arduino:data' , {
    value: data.toString()
  });
});
/* Step 01 > Foi mais uma vez utilizado a classe mySerial com a função com on (Srial.on)
porém desta ez passamos os parâmetros data, pois desejamos atuar sobre os dados da Portadesta vez.
a função data converte o dado para uma string.
Step 02 > Foi utilizando a função emit com a classe io que foi instanciado na linha 8,
obtendo assim as propriedades do socket.io e suas funções.
Passamos o parâmetro arduino:data para que ele posso distribuir esta informação a todos os
que conectarem ao socket. Convetemos o dado para String e enviamos no formato json.
*/


mySerial.on('err', function(err) {
  console.log(err);
});
/* Utilizamos novamente a classe mySerial com sua função on (mySerial.on) agora para verificar erros
como passamos o parâmetro (err) se houver um erro através dad função log receberemos a informaçãodo que ocorreu.

*/

http.listen(4000, function() {
  console.log('Listen port 4000');
});

/* Neste passo informamos onde o servidor atuará, passando os parâmetros de porta ( 4000 ou outro que desejar)
e com a função log verificamos se está funcionando.
*/
