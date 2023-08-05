import { useState } from "react";
import Button from "./components/Button";
import Game from "./components/Game";

function App() {
  const [isNewGame, setIsNewGame] = useState(false);

  if (!isNewGame) {
    return (
      <div className="bg-[#1A2A33] h-screen w-screen flex justify-center items-center">
        <div className="relative">
          <Button
            className="w-[460px] py-[17px] flex justify-center items-center z-10"
            color="success"
            onClick={() => setIsNewGame(true)}
          >
            <p className="text-primary text-sm font-bold tracking-wide">
              NEW GAME
            </p>
          </Button>
          <div className="h-full w-full absolute top-[15%] bg-opacity-60 rounded-xl z-0 bg-success" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A2A33] h-screen w-screen flex justify-center items-center">
      {isNewGame && <Game />}
    </div>
  );
}

export default App;
