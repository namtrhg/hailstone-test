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
        <XIcon
          className={isWinningSquare ? "text-primary" : "text-[#31C3BD]"}
        />
      );
    if (value === "O")
      return (
        <OIcon
          className={isWinningSquare ? "text-primary" : "text-[#F2B137]"}
        />
      );
    return null;
  };

  return (
    <div className="w-[140px] h-[140px] relative">
      <Button
        className={classNames(
          "w-[140px] h-[134px] !bg-[#1F3641] text-xl font-bold rounded-xl flex justify-center items-center z-10",
          { "!bg-[#F2B137]": isWinningSquare && winner === "O" },
          { "!bg-[#31C3BD]": isWinningSquare && winner === "X" }
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
}

const Board = (props: BoardProps) => {
  const { squares, onClick, winningSquares, winner } = props;
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
    <div className="grid grid-cols-3 gap-5">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index}>
          {renderSquare(index, winningSquares && winningSquares[index])}
        </div>
      ))}
    </div>
  );
};

export default Board;
