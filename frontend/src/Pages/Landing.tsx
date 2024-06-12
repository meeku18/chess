import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";


export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
        <div className="flex justify-center">
          <img className="max-w-md" src="/chess_image.png" />
        </div>
        <div className="pt-20">
          <h1 className="text-white">Let's Play</h1>
          <Button onClick={()=>navigate("/game")}>
                Play online
          </Button>
        </div>
      </div>
    </div>
  );

};
