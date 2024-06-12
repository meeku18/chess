// create a ws server
// i will be using ws library from npm 

import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
 // as soon as the user get connected 
 // lets add this user
  gameManager.addUser(ws); // this will add the current added user socket to the array of socket of all the users
  
  ws.on('disconnect', function disconnect() {
    gameManager.removeUser(ws);
  });
  
  
});
