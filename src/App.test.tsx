import { render, fireEvent, screen } from "@testing-library/react";
import Game from "./components/Game";
import Board from "./components/Board";

interface LocalStorageMock extends Storage {
  length: number;
  clear: () => void;
  key: (index: number) => string | null;
  removeItem: (key: string) => void;
}

const localStorageMock: LocalStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  removeItem: jest.fn(),
  length: 0,
};

global.localStorage = localStorageMock;

describe("Game component", () => {
  test("renders the game board and displays the correct player turn indicator", () => {
    render(<Game />);
    // Check if the game board is rendered
    expect(screen.getByTestId("game-board")).toBeInTheDocument();

    // Check if the player turn indicator is displayed
    expect(screen.getByText(/TURN/i)).toBeInTheDocument();
  });

  test("Player can make a move on the board", () => {
    render(<Game />);

    // Find an empty square on the board
    const emptySquares = screen.getAllByTestId("game-square");
    const emptySquare = emptySquares.find(
      (square) => square.textContent === ""
    );
    expect(emptySquare).toBeDefined(); // Check if emptySquare is defined
    if (!emptySquare) return; // Return early if emptySquare is undefined

    // Perform a click on the empty square
    fireEvent.click(emptySquare);

    // Check if the square is now filled with "X" or "O"
    expect(emptySquare).not.toBeEmptyDOMElement();
  });

});

describe('Board Component', () => {
  it('renders a 3x3 board with 9 squares', () => {
    render(
      <Board
        squares={Array(9).fill(null)}
        onClick={() => { } }
        winningSquares={null}
        winner={null}
        player1Score={0}
        player2Score={0}
        ties={0} />
    );

    const squares = screen.getAllByTestId('game-square');
    expect(squares.length).toBe(9);
  });

});
