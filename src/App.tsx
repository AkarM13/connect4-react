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
      </h3>
      <Button variant="primary" className="self-center mt-4">
        Start the game
      </Button>
    </div>
  );
}

export default App;
