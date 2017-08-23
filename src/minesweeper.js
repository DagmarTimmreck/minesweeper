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

    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
  return board;
};

const printBoard = (board, name) => {
  const printedRows = board.map(element => element.join(' | '));
  let printedBoard = `${name} Board: \n`;
  printedBoard += printedRows.join('\n');
  return printedBoard;
};

const playerBoard = generatePlayerBoard(4, 5);
console.log(printBoard(playerBoard, 'Player'));

const bombBoard = generateBombBoard(4, 5, 10);
console.log(printBoard(bombBoard, 'Bomb'));
