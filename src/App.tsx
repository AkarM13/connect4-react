import { Link } from "react-router-dom";
import Button from "./components/UI/Button";

function App() {
  return (
    <div className="ConnectFour container flex justify-center items-center flex-col mt-8">
      <h1 className="text-4xl font-semibold text-primary">Connect Four</h1>
      <h3 className="text-xl text-textColor font-semibold mt-8">OBJECTIVE:</h3>
      <ul className="text-lg mt-2 text-description">
        <li>
          To be the first player sto connect 4 of the same colored discs in a
          row (either vertically, horizontally, or diagonally).
        </li>
      </ul>
      <h3 className="text-lg text-textColor font-semibold mt-8">
        HOW TO PLAY:
        <ul className="mt-2 text-description text-lg font-normal">
          <li>
            First, decide who goes first and what color each player will have.
          </li>
          <li>
            Players must alternate turns, and only one disc can be dropped in
            each turn.
          </li>
          <li>
            On your turn drop one of your colored discs from the top into any of
            seven slots.
          </li>
          <li>The game ends when there is a 4-in-a-row or a stalemate.</li>
          <li>
            The starter of the previous game goes second on the next game.
          </li>
        </ul>
      </h3>

      <Link to="/game">
        <Button variant="primary" className="self-center mt-4">
          Start the game
        </Button>
      </Link>
    </div>
  );
}

export default App;
