# Tic-Tac-Toe Game

This is a simple Tic-Tac-Toe game implemented in React.

## How to Play

1. Clone this repository to your local machine.
2. Open a terminal and navigate to the project directory.
3. Install the required dependencies using the command: yarn.
4. Start the development server using the command: yarn start.
5. The game should now be running in your browser at `http://localhost:3000`.

## Gameplay

- Player 1 uses "X" and Player 2 uses "O".
- Click on an empty square to make a move.
- The game will detect a winner when there are three X's or O's in a row (horizontal, vertical, or diagonal), or when all squares are filled and there is no winner (tie).

## Features

- Player scores are displayed and persist across browser sessions using `localStorage`.
- Modals are used to handle game restarts, winner announcements, and ties.
- The game highlights the winning squares when a player wins.

## Testing

- To run the tests for the Tic-Tac-Toe game, use the command: yarn test.

## Technologies Used

- React
- TypeScript
- Tailwind CSS