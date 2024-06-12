import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

export const ChessBoard = ({board,socket,setBoard,chess}:{board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
} | null)[][] ,socket:WebSocket|null,setBoard:any,chess:any} )=>{

    const [from ,setFrom] = useState<string|null>(null);

    return (<div>
        {board.map((row,i)=>{
            return <div key={i} className="flex">
                {row.map((square,j)=>{
                    const cell = String.fromCharCode(65 + (j%8)).toLowerCase() + "" + (8 - i) ;
                    return <div onClick={()=>{
                        if(!from){
                            setFrom(cell);
                        }else{
                            if(!socket) return ;
                            socket.send(JSON.stringify({
                                type:'move',
                                move:{
                                    from,
                                    to:cell
                                }
                            }))
                            //console.log("hello");
                            console.log({from,cell});
                            chess.move({from,to:cell});
                            setBoard(chess.board());
                            setFrom(null);
                            
                        }
                    }} key={j} className={`w-20 h-20 ${((i+j)%2)?'bg-orange-950':'bg-yellow-200'}`}>
                        <div className="w-full h-full flex justify-center items-center ">
                            {square?square.type:"" }
                            {square?square.color:""}
                        </div>
                    </div>
                })}
            </div>
        })}
    </div>)
}