/*jshint esversion: 6 */

const net = require ('net');
const fs = require('fs');
const users = [];

let server = net.createServer((socket) => {
  socket.setEncoding('utf8');
  
  server.getConnections( function(err, count){
    console.log(`${socket.remotePort} has connected. As of now ${count} peeps are connected.`);
  }); 
 
  users.push(socket);

  socket.on('data', (data) =>{
    process.stdout.write(`${socket.remotePort}: ${data}`);
    users.forEach( (each)=>{
      each.write(`${socket.remotePort}: ${data}`);
    });
  });

  process.stdin.on('data', (cmd) =>{
    users.forEach( (each)=>{
      each.write(`[admin]: ${cmd}`);
    });
  });

  socket.on('end', ()=>{
    server.getConnections( (err, count)=>{
      console.log(`${socket.remotePort} has finally disconnected! As of right now, ${count} peeps are connected`);
    });
  });
});  


server.listen(6969, '0.0.0.0', () => {
  console.log(`opened ya shit on ${server.address()}`);
});