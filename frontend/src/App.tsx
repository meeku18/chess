import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./Pages/Landing";
import { Game } from "./Pages/Game";

export default function App() {
  return (
    <div className="bg-zinc-800 h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/game" element={<Game />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
