import { useEffect, useState } from "react";
import Board, { SquareValue } from "../Board/Board";
import Button from "../Button";
import Modal from "../Modal";
import classNames from "classnames";
import { ReactComponent as XIcon } from "../svg/x.svg";
import { ReactComponent as OIcon } from "../svg/o.svg";
import { ReactComponent as XGrayIcon } from "../svg/x-gray.svg";
import { ReactComponent as OGrayIcon } from "../svg/o-gray.svg";
import { ReactComponent as Restartcon } from "../svg/restart.svg";

const calculateWinner = (squares: SquareValue[]): SquareValue => {
  const winPatterns: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const Game = () => {
  const [history, setHistory] = useState<SquareValue[][]>([
    Array(9).fill(null),
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
  const [isTieModalOpen, setIsTieModalOpen] = useState(false);

  const [player1Score, setPlayer1Score] = useState<number>(
    parseInt(localStorage.getItem("player1Score") || "0")
  );
  const [player2Score, setPlayer2Score] = useState<number>(
    parseInt(localStorage.getItem("player2Score") || "0")
  );
  const [ties, setTies] = useState<number>(
    parseInt(localStorage.getItem("ties") || "0")
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseWinnerModal = () => {
    setIsWinnerModalOpen(false);
  };

  const handleCloseTieModal = () => {
    setIsTieModalOpen(false);
  };

  const handleReset = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
    setIsModalOpen(false);
    setIsWinnerModalOpen(false);
    setIsTieModalOpen(false);
    localStorage.setItem("player1Score", "0");
    localStorage.setItem("player2Score", "0");
    localStorage.setItem("ties", "0");
  };

  const handleClick = (index: number) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    if (calculateWinner(current) || current[index]) {
      return;
    }

    const squares = [...current];
    squares[index] = xIsNext ? "X" : "O";
    setHistory([...currentHistory, squares]);
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  };

  const findWinningSquares = (
    squares: SquareValue[],
    winner: SquareValue
  ): boolean[] => {
    return squares.map((square) => square === winner);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current);
  const winningSquares = winner ? findWinningSquares(current, winner) : null;

  const status = xIsNext ? (
    <XGrayIcon className="h-5 w-5" />
  ) : (
    <OGrayIcon className="h-5 w-5" />
  );

  useEffect(() => {
    if (winner) {
      setIsWinnerModalOpen(true);

      if (winner === "X") {
        setPlayer1Score((prevScore) => prevScore + 1);
        localStorage.setItem("player1Score", (player1Score + 1).toString());
      } else if (winner === "O") {
        setPlayer2Score((prevScore) => prevScore + 1);
        localStorage.setItem("player2Score", (player2Score + 1).toString());
      }
    }
    if (history.length === 10) {
      setIsTieModalOpen(true);

      setTies((prevTies) => prevTies + 1);
      localStorage.setItem("ties", (ties + 1).toString());
    }
  }, [history.length, winner]);

  return (
    <div>
      <div className="mb-5 flex justify-between items-center w-full">
        <div className="flex justify-center items-center space-x-2.5">
          <XIcon className="h-8 w-8 text-success" />
          <OIcon className="h-8 w-8 text-warning" />
        </div>
        <div>
          <div className="bg-primary w-[140px] h-[52px] flex justify-center items-center shadow-md relative rounded-xl">
            <div className="w-[140px] h-[52px] bg-primary flex justify-center items-center space-x-3 rounded-xl z-10">
              {status}
              <span className="font-extrabold text-[#A8BFC9]">TURN</span>
            </div>
            <div className="h-[52px] w-full bg-[#000000]/10 absolute top-[10%] z-0 rounded-xl" />
          </div>
        </div>
        <div className="h-[52px] w-[52px] relative">
          <Button
            className="bg-secondary w-[52px] h-[48px] z-10"
            onClick={handleOpenModal}
          >
            <Restartcon />
          </Button>
          <div className="h-full w-full absolute top-[2%] bg-opacity-40 rounded-xl z-0 bg-secondary" />
        </div>
      </div>
      <div>
        <Board
          squares={current}
          onClick={handleClick}
          winningSquares={winningSquares}
          winner={winner}
          player1Score={player1Score}
          player2Score={player2Score}
          ties={ties}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-[#A8BFC9] font-bold text-4xl tracking-wide">
            RESTART GAME?
          </h1>
          <div className="flex space-x-4">
            <div className="mt-8 h-[52px] w-[139px] relative">
              <Button
                color="secondary"
                className="h-[52px] w-[139px] text-primary font-bold tracking-wider z-10"
                onClick={handleCloseModal}
              >
                NO, CANCEL
              </Button>
              <div className="h-full w-full absolute top-[8%] rounded-xl bg-secondary/50 z-0" />
            </div>
            <div className="mt-8 h-[52px] w-[139px] relative">
              <Button
                color="warning"
                className="h-[52px] w-[139px] text-primary font-bold tracking-wider z-10"
                onClick={handleReset}
              >
                YES
              </Button>
              <div className="h-full w-full absolute top-[8%] rounded-xl bg-warning/50 z-0" />
            </div>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isWinnerModalOpen} onClose={handleCloseWinnerModal}>
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-[#A8BFC9] font-bold text-sm tracking-wide mb-4">
            PLAYER {winner === "X" ? 1 : 2} WINS!
          </p>
          <h1
            className={classNames(
              "font-bold text-4xl tracking-wide flex justify-center items-center space-x-6",
              winner === "O" ? "text-warning" : "text-success"
            )}
          >
            {winner === "O" ? (
              <OIcon className="h-16 w-16 text-warning" />
            ) : (
              <XIcon className="h-16 w-16 text-success" />
            )}
            <span>TAKES THE ROUND</span>
          </h1>
          <div className="flex space-x-4">
            <div className="mt-8 h-[52px] w-[76px] relative">
              <Button
                color="secondary"
                className="h-[52px] w-[76px] text-primary font-bold tracking-wider z-10"
                onClick={handleCloseWinnerModal}
              >
                QUIT
              </Button>
              <div className="h-full w-full absolute top-[8%] rounded-xl bg-secondary/50 z-0" />
            </div>
            <div className="mt-8 h-[52px] w-[146px] relative">
              <Button
                color="warning"
                className="h-[52px] w-[146px] text-primary font-bold tracking-wider z-10"
                onClick={handleReset}
              >
                NEXT ROUND
              </Button>
              <div className="h-full w-full absolute top-[8%] rounded-xl bg-warning/50 z-0" />
            </div>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isTieModalOpen} onClose={handleCloseTieModal}>
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-[#A8BFC9] font-bold text-4xl tracking-wide">
            ROUND TIED
          </h1>
          <div className="flex space-x-4">
            <div className="mt-8 h-[52px] w-[76px] relative">
              <Button
                color="secondary"
                className="h-[52px] w-[76px] text-primary font-bold tracking-wider z-10"
                onClick={handleCloseTieModal}
              >
                QUIT
              </Button>
              <div className="h-full w-full absolute top-[8%] rounded-xl bg-secondary/50 z-0" />
            </div>
            <div className="mt-8 h-[52px] w-[146px] relative">
              <Button
                color="warning"
                className="h-[52px] w-[146px] text-primary font-bold tracking-wider z-10"
                onClick={handleReset}
              >
                NEXT ROUND
              </Button>
              <div className="h-full w-full absolute top-[8%] rounded-xl bg-warning/50 z-0" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Game;
