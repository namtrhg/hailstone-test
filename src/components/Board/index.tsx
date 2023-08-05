import Button from "../Button";
import classNames from "classnames";
import { ReactComponent as XIcon } from "../svg/x.svg";
import { ReactComponent as OIcon } from "../svg/o.svg";

export type SquareValue = "X" | "O" | null;

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinningSquare: boolean;
  winner: SquareValue;
}

const Square = (props: SquareProps) => {
  const { value, onClick, isWinningSquare, winner } = props;
  const getValue = () => {
    if (value === "X")
      return (
        <XIcon className={isWinningSquare ? "text-primary" : "text-success"} />
      );
    if (value === "O")
      return (
        <OIcon className={isWinningSquare ? "text-primary" : "text-warning"} />
      );
    return null;
  };

  return (
    <div className="w-[140px] h-[140px] relative">
      <Button
        className={classNames(
          "w-[140px] h-[134px] !bg-[#1F3641] text-xl font-bold rounded-xl flex justify-center items-center z-10",
          { "!bg-warning": isWinningSquare && winner === "O" },
          { "!bg-success": isWinningSquare && winner === "X" }
        )}
        onClick={onClick}
      >
        {getValue()}
      </Button>
      <div className="h-full w-full absolute top-[2%] rounded-xl bg-[#000000]/20 z-0" />
    </div>
  );
};

interface BoardProps {
  squares: SquareValue[];
  onClick: (index: number) => void;
  winningSquares: any;
  winner: SquareValue;
  player1Score: number;
  player2Score: number;
  ties: number;
}

const Board = (props: BoardProps) => {
  const {
    squares,
    onClick,
    winningSquares,
    winner,
    player1Score,
    player2Score,
    ties,
  } = props;

  const renderSquare = (index: number, isWinningSquare: boolean) => {
    return (
      <Square
        key={index}
        value={squares[index]}
        onClick={() => onClick(index)}
        isWinningSquare={isWinningSquare}
        winner={winner}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-5" data-testid="game-board">
      {Array.from({ length: 9 }).map((_, index) => {
        return (
          <div key={index} data-testid="game-square">
            {renderSquare(index, winningSquares && winningSquares[index])}
          </div>
        );
      })}
      <div className="bg-success rounded-xl h-[72px] flex flex-col justify-center items-center">
        <p>X (P1)</p>
        <p className="font-bold">{player1Score}</p>
      </div>
      <div
        className={classNames(
          "rounded-xl h-[72px] text-primary flex flex-col justify-center items-center",
          ties ? "bg-secondary" : "bg-[#1F3641]"
        )}
      >
        <p>TIES</p>
        <p className="font-bold">{ties}</p>
      </div>
      <div className="bg-warning rounded-xl h-[72px] flex flex-col justify-center items-center">
        <p>O (P2)</p>
        <p className="font-bold">{player2Score}</p>
      </div>
    </div>
  );
};

export default Board;
