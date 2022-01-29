import { useEffect, useState } from "react";
import Button from "../../components/UI/Button";
import {
  Board,
  checkAll,
  fillBoard,
  getNextPlayableRow,
  getValidLocations,
  minimax,
} from "./boardHelpers";
import PlayerCard from "./PlayerCard";
import Row from "./Row";

export default function Game() {
  const [player1, setPlayer1] = useState(1);
  const [player2, setPlayer2] = useState(2);
  const [currentPlayer, setCurrentPlayer] = useState<null | number>(null);
  const [board, setBoard] = useState<Board>();
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const [player1RoundsWon, setPlayer1RoundsWon] = useState(0);
  const [player2RoundsWon, setPlayer2RoundsWon] = useState(0);
  const [isAiPlaying, setIsAiPlaying] = useState(false);
  useEffect(() => {
    initBoard();
  }, []);

  function setToDefault(board: Board) {
    setPlayer1(1);
    setPlayer2(2);
    setCurrentPlayer(player1);
    setBoard(board);
    setGameOver(false);
    setMessage("");
  }
  function initBoard() {
    // 6 rows, and 7 columns
    const board = fillBoard(6, 7);

    setToDefault(board);
  }

  function togglePlayer() {
    return currentPlayer === player1 ? player2 : player1;
  }

  if (board !== undefined) {
    console.log(getValidLocations(board));
  }
  function aiPlay() {
    if (board !== undefined) {
      const currentBoard = board;

      let col, minimaxScore;
      if (board !== null) {
        // Bapey minimax algorithm'aka, ch column'ek basha.
        [col, minimaxScore] = minimax(
          currentBoard,
          4,
          true,
          player1,
          player2,
          gameOver
        );

        // Am method'y play'a wakw awa waya AI click bka law column'ay
        // ka halbzherdrawa lalayan minimax algorithm'akawa.
        play(col);
        console.log("Best move apparently", col);
      }
    }
  }

  // Toggle auto play with two AI's
  // useEffect(() => {
  //   if (currentPlayer === player1 && board !== undefined) {
  //     const currentBoard = board;

  //     let col, minimaxScore;
  //     if (mode && board !== null) {
  //       [col, minimaxScore] = minimax(
  //         currentBoard,
  //         6,
  //         false,
  //         player1,
  //         player2,
  //         gameOver
  //       );
  //       console.log("Best move apparently", col);
  //       play(col);
  //     }
  //   }
  // }, [currentPlayer]);

  // Hamw jarek
  function play(column: number | null) {
    if (column !== null) {
      if (!gameOver) {
        // Lanaw array multi-dimensional'aka, bapey aw column'w row'ay ka mawa w null nia
        // assign'y aka bo currentPlayer.
        // null yan abet ba 1 yan abe ba 2.

        // Place piece on board
        let currentBoard = board;
        if (currentBoard) {
          for (let r = 5; r >= 0; r--) {
            if (!currentBoard[r][column]) {
              currentBoard[r][column] = currentPlayer;
              break;
            }
          }
        }

        // Check status of board
        if (currentBoard !== undefined) {
          // Xoy connect 4 abe, 4 danabe badwai yaka.
          // Boya ema method'akanman ka daman nawa pekhatwn la
          // checkVertical(board) ||
          // checkDiagonalRight(board) ||
          // checkDiagonalLeft(board) ||
          // checkHorizontal(board) ||
          // checkDraw(board)

          // Amana 7saby 3 dana akan, balam labar away click krawa lasar column'aka esta
          // Amashy acheta sar, boya agar har yak law winning conditionan'ana rast bw.
          // awa winner diari akre.
          // Possible values'akani checkAll() britia:
          // 1: 1
          // 2: 2
          // 3: draw
          let result = checkAll(currentBoard);
          if (result === player1) {
            setBoard(currentBoard);
            setGameOver(true);
            setIsAiPlaying(false);
            setMessage("Player 1 (RED) wins!");
            setPlayer1RoundsWon(player1RoundsWon + 1);
          } else if (result === player2) {
            setBoard(currentBoard);
            setGameOver(true);
            setIsAiPlaying(false);
            setMessage("Player 2 (YELLOW) wins!");
            setPlayer2RoundsWon(player2RoundsWon + 1);
          } else if (result === "draw") {
            setBoard(currentBoard);
            setGameOver(true);
            setIsAiPlaying(false);
            setMessage("It's a draw!");
          } else {
            // Hich winning condition'ek rwy nayawa, kawata bardawam ba.
            setCurrentPlayer(togglePlayer());
          }
        } else {
          setMessage("Game over. Please start a new game.");
        }
      }
    }
  }

  useEffect(() => {
    if (currentPlayer === player2) {
      setIsAiPlaying(true);
    } else {
      setIsAiPlaying(false);
    }
    setTimeout(function () {
      // Call ai play
      if (currentPlayer === player2) {
        aiPlay();
      }
    }, 1000);
  }, [currentPlayer, player2]);

  return (
    <div className="container flex justify-center items-center">
      <PlayerCard
        isItTheirTurn={currentPlayer === player1}
        player={player1}
        roundsWon={player1RoundsWon}
      />
      <div className="">
        <div
          className="winorloss "
          style={{
            backgroundColor:
              gameOver && currentPlayer === 1
                ? "rgba(0,200,0,0.4)"
                : "rgba(200,0,0,0.4)",
            display: gameOver && currentPlayer ? "table" : "none",
          }}
        >
          <div className="flex justify-center items-center flex-col h-full">
            {gameOver && currentPlayer === 1 ? (
              <div>
                <h1>{"You WON!!!"}</h1>
              </div>
            ) : (
              <div>
                <h1>{"you LOST!!!"}</h1>
              </div>
            )}
            <Button
              variant="primary"
              className="mt-10 self-center"
              onClick={() => {
                setCurrentPlayer(1);
                initBoard();
              }}
            >
              New Game
            </Button>
          </div>
        </div>
        <div className="game mt-12">
          <h1 className="text-primary text-5xl mt-4 font-semibold">
            CONNECT<span className="text-description">4</span>
          </h1>
          <table
            className={`mt-20 ${
              isAiPlaying ? "pointer-events-none opacity-70" : ""
            }`}
          >
            <thead />
            <tbody className="board-container">
              {board &&
                board.map((row, i) => {
                  return (
                    <Row
                      key={i}
                      row={row}
                      play={(column: number) => {
                        if (row[column] === 1 || row[column] === 2) {
                          setMessage("Invalid move");
                        } else {
                          play(column);
                        }
                      }}
                    />
                  );
                })}
            </tbody>
          </table>
          <p className="message"> {message} </p>
        </div>
      </div>
      <PlayerCard
        isItTheirTurn={currentPlayer === player2}
        player={player2}
        roundsWon={player2RoundsWon}
      />
    </div>
  );
}
