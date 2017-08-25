const generateEmptyBoard = (numberOfRows, numberOfColumns) => {
  const board = [];
  for (let i = 0; i < numberOfRows; i++) {
    board.push([]);
    for (let j = 0; j < numberOfColumns; j++) {
      board[i].push(null);
    }
  }
  return board;
};

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board = generateEmptyBoard(numberOfRows, numberOfColumns);
  return board.map(row => row.map(() => ' '));
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = generateEmptyBoard(numberOfRows, numberOfColumns);

  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    const randomRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    if (!board[randomRowIndex][randomColumnIndex]) {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }
  return board;
};

const getNumberOfNeighborBombs = (board, x, y) => {
  const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0,1], [1, -1], [1, 0], [1, 1]];

  const neighbors =
    neighborOffsets.map(coords => {
      return [coords[0] + x, coords[1] + y];
    }).filter(coords => coords[0] >= 0 && coords[0] < board.length);

  return neighbors.filter(coords => board[coords[0]][coords[1]] === 'B').length;
};

const flipTile = (board, bombs, x, y) => {
  if (board[x][y] === ' ') {
    if (bombs[x][y]) {
      board[x][y] = 'B';
      console.log('You hit a bomb. Game over!')
    } else {
      board[x][y] = getNumberOfNeighborBombs(bombs, x, y);
    }
  } else {
    console.log('The tile has already been flipped.');
  }
};

const printBoard = (board, name) => {
  const printedRows = board.map(element => element.join(' | '));
  let printedBoard = `${name} Board: \n`;
  printedBoard += printedRows.join('\n');
  return printedBoard;
};

const numberOfRows = 4;
const numberOfColumns = 5;
const numberOfBombs = 10;

const playerBoard = generatePlayerBoard(numberOfRows, numberOfColumns);
console.log(printBoard(playerBoard, 'Player'));

const bombBoard = generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
console.log(printBoard(bombBoard, 'Bomb'));

for (let i =0 ; i < numberOfRows; i++) {
  for (let j = 0; j < numberOfColumns; j++) {
    flipTile(playerBoard, bombBoard, i,j);
    console.log(printBoard(playerBoard, 'Player'));
  }
}
flipTile(playerBoard, bombBoard, 3, 3);
