"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.game = [];
        this.users = [];
        this.pendingUser = null;
    }
    addUser(socket) {
        this.users.push(socket);
        this.handleMessage(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
        // as one of the user left we need to stop the game if it is already begin started
    }
    handleMessage(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            // console.log(message);
            // console.log(message.type);
            if (message.type === "init_game") { // i should probably move the types in another messagetypes.ts file -> PENDING WORK
                // what if a single user wants to join again --------->  ISSUE( i need check that the new user should be different from the previous user and pending.User should not be 
                // equal to the current socket -> basically a person cannot play with itself
                //)
                if (!this.pendingUser) {
                    this.pendingUser = socket;
                }
                else {
                    // start a game
                    const game = new Game_1.Game(socket, this.pendingUser);
                    this.game.push(game); // this will add this particular game object in my game array
                    this.pendingUser = null; // at this point no player is waiting 
                }
            }
            if (message.type === 'move') {
                // i need to make game player variables public as i need to search for the game , using player socket as identifier
                const game = this.game.find(game => game.player1 === socket || game.player2 === socket);
                if (game === undefined) {
                    // the user cannot send message type of moves 
                    return;
                }
                else {
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
