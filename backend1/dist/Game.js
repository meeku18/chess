"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.moveCount = 0;
        this.player1.send(JSON.stringify({
            type: "init_game",
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: "init_game",
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        // validate the type of moves that i received using zod here-> PENDING WORK
        // if a user makes a move 
        // ->  i should probably create my own validation logic -> PENDING WORK
        // but for now i am using chess.js library for validation
        console.log(move);
        if (this.moveCount % 2 == 0 && socket != this.player1) {
            return;
        }
        if (this.moveCount % 2 == 1 && socket != this.player2) {
            return;
        }
        console.log("after return");
        try {
            this.board.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        // firstly i need to check if this move is valid or not -> done
        // update the state of the board-> done 
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: "game_over",
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            this.player2.send(JSON.stringify({
                type: "game_over",
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        this.player2.send(JSON.stringify({
            type: "move",
            payload: move
        }));
        this.player1.send(JSON.stringify({
            type: "move",
            payload: move
        }));
        this.moveCount++;
        // step 3  check the state for checkmate or 
    }
}
exports.Game = Game;
