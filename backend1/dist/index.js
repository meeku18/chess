"use strict";
// create a ws server
// i will be using ws library from npm 
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = new GameManager_1.GameManager();
wss.on('connection', function connection(ws) {
    // as soon as the user get connected 
    // lets add this user
    gameManager.addUser(ws); // this will add the current added user socket to the array of socket of all the users
    ws.on('disconnect', function disconnect() {
        gameManager.removeUser(ws);
    });
});
