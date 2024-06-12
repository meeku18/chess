import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

const INIT_GAME = "init_game";
const MOVE = "move"
const GAME_OVER = "game_over";


export const Game = () => {

  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board()); // the board will be set accoring to
  // the chess move 

  
  useEffect(() => {
    // whenever  message is received this socket.onmessage event
    // will be triggered
    if(!socket) return ;
    socket.onmessage = (event) => {

      const message = JSON.parse(event.data); // this will be the received message
      switch (message.type) {
        case INIT_GAME:
          setChess(new Chess());
          setBoard(chess.board());
          console.log("Game intialized");
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          break;
        case GAME_OVER:
          console.log("game_over");
          break;
      }
    };

  }, [socket]);

  if (!socket) {
    return <div>Connecting...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full ">
        <div className="grid grid-cols-6 gap-4 ">
          <div className="col-span-4 bg-red-200 justify-center flex">
            <ChessBoard board={board} socket={socket} chess={chess} setBoard={setBoard}/>
          </div>
          <div className="col-span-2 bg-red-600 flex justify-center">
            <div className="pt-4">
              <Button
                onClick={() =>
                  socket.send(JSON.stringify({type:INIT_GAME}))
                }
              >
                Play
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
