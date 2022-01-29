import _ from "lodash";
export type Board = Array<Array<number | null>>;

// Ama matrix'eky 6 ba 7 drwst aka.
// 6 rows
// 7 cols
// w pry akat la null bo awai dwatr btwanin daskari kainawa
export function fillBoard(rows: number, columns: number) {
  const board = [];
  for (let rows = 0; rows < 6; rows++) {
    let row = [];
    for (let columns = 0; columns < 7; columns++) {
      row.push(null);
    }
    board.push(row);
  }

  return board;
}

// Generate a random number between 0 and 6
export function randomPlay() {
  return Math.floor(Math.random() * Math.floor(7));
}

// Ama array'eky ayayte random'y elementek'y awe return aka
export function randomChoice(array: Array<number>) {
  return array[Math.floor(Math.random() * array.length)];
}

export function makeMove(
  board: Board,
  row: number | undefined,
  col: number | undefined,
  player: number
) {
  if (row !== undefined && col !== undefined) {
    return (board[row][col] = player);
  }
}

// Sairy matrix'aka aka agar 3 dana ba dwai yaka bwn ba verticall'y
// Boolean'ek return aka, true or false
export function checkVertical(board: Board) {
  // Check only if row is 3 or greater
  for (let rows = 3; rows < 6; rows++) {
    for (let columns = 0; columns < 7; columns++) {
      if (board[rows][columns]) {
        if (
          board[rows][columns] === board[rows - 1][columns] &&
          board[rows][columns] === board[rows - 2][columns] &&
          board[rows][columns] === board[rows - 3][columns]
        ) {
          return board[rows][columns];
        }
      }
    }
  }
}

// Sairy matrix'aka aka agar 3 dana ba dwai yaka bwn ba horizontal'y
// Boolean'ek return aka, true or false
export function checkHorizontal(board: Board) {
  // Check only if column is 3 or less
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r][c + 1] &&
          board[r][c] === board[r][c + 2] &&
          board[r][c] === board[r][c + 3]
        ) {
          return board[r][c];
        }
      }
    }
  }
}

// Sairy matrix'aka aka agar 3 dana ba dwai yaka bwn ba diagonally -> /
// Boolean'ek return aka, true or false
export function checkDiagonalRight(board: Board) {
  // Check only if row is 3 or greater AND column is 3 or less
  for (let r = 3; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r - 1][c + 1] &&
          board[r][c] === board[r - 2][c + 2] &&
          board[r][c] === board[r - 3][c + 3]
        ) {
          return board[r][c];
        }
      }
    }
  }
}

// Sairy matrix'aka aka agar 3 dana ba dwai yaka bwn ba diagonally -> \
// Boolean'ek return aka, true or false
export function checkDiagonalLeft(board: Board) {
  // Check only if row is 3 or greater AND column is 3 or greater
  for (let r = 3; r < 6; r++) {
    for (let c = 3; c < 7; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r - 1][c - 1] &&
          board[r][c] === board[r - 2][c - 2] &&
          board[r][c] === board[r - 3][c - 3]
        ) {
          return board[r][c];
        }
      }
    }
  }
}

export function checkDraw(board: Board) {
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      if (board[r][c] === null) {
        return null;
      }
    }
  }
  return "draw";
}

export function checkAll(board: Board) {
  return (
    checkVertical(board) ||
    checkDiagonalRight(board) ||
    checkDiagonalLeft(board) ||
    checkHorizontal(board) ||
    checkDraw(board)
  );
}

export function arrayColumn(arr: Array<any>, n: number) {
  return arr.map((x: any) => x[n]);
}

// get the nth column of the board
export function getNItems(arr: Array<any>) {
  const tempCol = [];
  for (let i = 0; i < arr.length - 3; i++) {
    tempCol.push(arr.slice(i, i + 4));
  }
  return tempCol;
}

// Get the count of a particular circle in the array.
export function getCount(arr: Array<any>, n: number | null) {
  return arr.reduce((total, x) => (x === n ? total + 1 : total), 0);
}

// Is this a valid location to add the move to
// Aya am location'a bakalk yat
// Har location'ek null'y tiabw, diara bakalk yat chwnka hich playerek bakari nahenawa.
export function isValidLocation(arr: Array<any>) {
  return arr.includes(null);
}

// Score the move for AI
export function scoreEvaluation(arr: any, player: number) {
  let score = 0;

  if (getCount(arr, player) === 4) {
    score += 100;
  } else if (getCount(arr, player) === 3 && getCount(arr, null) === 1) {
    score += 10;
  } else if (getCount(arr, player) === 2 && getCount(arr, null) === 2) {
    score += 5;
  } else if (getCount(arr, player) === 0 && getCount(arr, null) === 6) {
    score += 1;
  }
  if (getCount(arr, 1) === 3 && getCount(arr, null) === 1) {
    score -= 80;
  } else if (getCount(arr, 1) === 2 && getCount(arr, null) === 2) {
    score -= 10;
  }
  return score;
}

// Array flat aka, multidimensional akata one dimensional array
export function flatten(arr: Array<any>) {
  return [].concat.apply([], arr);
}

export function positiveDiagonal(
  board: Board,
  iCounter: number,
  jCounter: number
) {
  let arr = [];
  for (let i = iCounter, j = jCounter; i >= 0 && j < jCounter + 4; i--, j++) {
    arr.push(board[i][j]);
  }
  return arr;
}

export function negativeDiagonal(
  board: Board,
  iCounter: number,
  jCounter: number
) {
  let count = 0;
  let arr = [];
  for (let i = iCounter, j = jCounter; count < 4; i--, j--) {
    arr.push(board[i][j]);
    count++;
  }
  return arr;
}

export function scoreMove(board: Board, player: number) {
  let score = 0;
  const row = [];
  const col = [];

  // Center column preferences
  let centerArray = [];
  for (let i = 0; i < 6; i++) {
    centerArray.push(board[i][3]);
  }
  score += getCount(centerArray, player) * 6;

  // Horizontal moves for AI
  for (let i = 0; i < board.length; i++) {
    row.push(getNItems(board[i]));
  }
  const groupedRows = flatten(row);
  for (let i = 0; i < groupedRows.length; i++) {
    score += scoreEvaluation(groupedRows[i], player);
  }

  // Vertical moves for AI
  for (let i = 0; i <= board.length; i++) {
    const tempCol = [];
    tempCol.push(getNItems(arrayColumn(board, i)));
    col.push(flatten(tempCol));
  }
  const groupedCols = flatten(col);
  for (let i = 0; i < groupedCols.length; i++) {
    score += scoreEvaluation(groupedCols[i], player);
  }

  // Positive slopes
  let posArr;
  for (let i = 3; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      posArr = positiveDiagonal(board, i, j);
      score += scoreEvaluation(posArr, player);
    }
  }

  // negative slopes
  let negArr;
  for (let i = 3; i < 6; i++) {
    for (let j = 3; j < 7; j++) {
      negArr = negativeDiagonal(board, i, j);
      score += scoreEvaluation(negArr, player);
    }
  }

  return score;
}

// Get all the valid locations
export function getValidLocations(board: Board) {
  const modifiedBoard = board;
  const validLocations = [];
  for (let i = 0; i < 7; i++) {
    if (isValidLocation(arrayColumn(modifiedBoard, i))) {
      validLocations.push(i);
    }
  }
  return validLocations;
}

// next row that can be played
export function getNextPlayableRow(board: Board, column: number) {
  for (let rows = 5; rows >= 0; rows--) {
    if (board[rows][column] === null) {
      return rows;
    }
  }
}

export function minimax(
  board: Board,
  depth: number,
  maximizingPlayer: boolean,
  player1: number,
  player2: number,
  gameOver: boolean
) {
  const validLocations = getValidLocations(board);
  let result = checkAll(board);
  if (depth === 0 || gameOver) {
    if (gameOver) {
      if (result === player2) {
        return [null, Number.POSITIVE_INFINITY];
      } else if (result === player1) {
        return [null, Number.NEGATIVE_INFINITY];
      } else {
        return [null, 0];
      }
    } else {
      return [null, scoreMove(board, player2)];
    }
  }
  if (maximizingPlayer) {
    let value = Number.NEGATIVE_INFINITY;
    let bestColumns = randomChoice(validLocations);
    for (let i = 0; i < validLocations.length; i++) {
      const row = getNextPlayableRow(board, validLocations[i]);
      let tempBoard = _.cloneDeep(board);
      if (row) {
        makeMove(tempBoard, row, validLocations[i], player2);
        const score = minimax(
          tempBoard,
          depth - 1,
          false,
          player1,
          player2,
          gameOver
        );
        if (score[1] !== null && score[1] > value) {
          value = score[1];
          bestColumns = validLocations[i];
        }
      }
    }
    return [bestColumns, value];
  } else {
    let value = Number.POSITIVE_INFINITY;
    let bestColumns = randomChoice(validLocations);
    for (let i = 0; i < validLocations.length; i++) {
      const row = getNextPlayableRow(board, validLocations[i]);
      let tempBoard = _.cloneDeep(board);
      if (row) {
        makeMove(tempBoard, row, validLocations[i], 1);
        const score = minimax(
          tempBoard,
          depth - 1,
          true,
          player1,
          player2,
          gameOver
        );
        if (score[1] !== null && score[1] < value) {
          value = score[1];
          bestColumns = validLocations[i];
        }
      }
    }
    return [bestColumns, value];
  }
}
