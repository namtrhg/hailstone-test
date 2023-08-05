import React from "react";
import Button from "../Button";

export type SquareValue = "X" | "O" | null;

interface BoardProps {
  squares: SquareValue[];
  onClick: (index: number) => void;
}

const Square: React.FC<{ value: SquareValue; onClick: () => void }> = ({
  value,
  onClick,
}) => {
  const getValue = () => {
    if (value === "X") return <img src="/svg/x.svg" alt="x" />;
    if (value === "O") return <img src="/svg/o.svg" alt="o" />;
    else return;
  };
  return (
    <div className="w-[140px] h-[140px] relative">
      <Button
        className="w-[140px] h-[134px] !bg-[#1F3641] text-xl font-bold rounded-xl flex justify-center items-center z-10"
        onClick={onClick}
      >
        {getValue()}
      </Button>
      <div className="h-full w-full absolute top-[2%] rounded-xl bg-[#000000]/20 z-0" />
    </div>
  );
};

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  const renderSquare = (index: number) => {
    return <Square value={squares[index]} onClick={() => onClick(index)} />;
  };

  return (
    <div className="grid grid-cols-3 gap-5">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index}>{renderSquare(index)}</div>
      ))}
    </div>
  );
};

export default Board;
