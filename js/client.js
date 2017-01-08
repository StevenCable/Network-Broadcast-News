/* jshint esversion: 6 */

const net=require('net');
var counter = 0;
var username = "username";


let client = net.createConnection(6969, 'localhost');
  
  client.setEncoding('utf8');

  client.on('connect', ()=>{
    console.log("Welcome welcome, come one come all! What is your Username?");
    process.stdin.pipe(client);
  });

  client.on('data', (data) => {
    process.stdout.write(`${data}`);
  });

  client.on('end', () =>{
    process.stdout.write('disconnected mayne');
  });