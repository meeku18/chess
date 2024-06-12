import { WebSocket } from "ws";
import { Chess } from 'chess.js';

export class Game {
  // bunch of properties
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private startTime: Date;
  private moveCount:number;


  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    this.moveCount = 0;
    this.player1.send(JSON.stringify({
        type:"init_game",
        payload:{
            color:"white"
        }
    }));
    this.player2.send(JSON.stringify({
        type:"init_game",
        payload:{
            color:"black"
        }
    }));

  }

  makeMove(socket:WebSocket,move:{
    from:string;
    to:string;
  }){
    // validate the type of moves that i received using zod here-> PENDING WORK

    // if a user makes a move 
    // ->  i should probably create my own validation logic -> PENDING WORK
        // but for now i am using chess.js library for validation
    console.log(move);
    if(this.moveCount % 2 == 0  && socket != this.player1){
        return;
    }
    if(this.moveCount % 2 == 1 && socket!=this.player2){
        return;
    }
    console.log("after return");
    try{
        this.board.move(move);
    }catch(e){
        console.log(e);
        return;
    }
    // firstly i need to check if this move is valid or not -> done
    // update the state of the board-> done 

    if(this.board.isGameOver()){
        this.player1.send(JSON.stringify({
            type:"game_over",
            payload:{
                winner:this.board.turn() === "w" ? "black":"white"
            }
        }))
        this.player2.send(JSON.stringify({
            type:"game_over",
            payload:{
                winner:this.board.turn() === "w" ? "black":"white"
            }
        }))
        return;
    }

    if(this.moveCount%2 == 0){
        this.player2.send(JSON.stringify({
            type:"move",
            payload:move
        }))
    }else{
        this.player1.send(JSON.stringify({
            type:"move",
            payload:move
        }))
    }
    this.moveCount ++;
    // step 3  check the state for checkmate or 
  }


}
