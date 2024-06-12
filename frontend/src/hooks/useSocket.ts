import { useEffect, useState } from "react"

const WS_URL = "ws://localhost:8080";

export const useSocket = ()=>{
    const [socket ,setSocket] = useState<WebSocket|null>(null);
    // i need to check this once again -->PENDING WORK
    useEffect(()=>{
         const ws = new WebSocket(WS_URL);
         ws.onopen = ()=>{
            setSocket(ws);
         }
         
         ws.onclose = ()=>{
            console.log("disconnected");
            setSocket(null);
         }
         // adding clean up function 
         return() => {
            ws.close();
         }
    },[]);

    return socket;   
};