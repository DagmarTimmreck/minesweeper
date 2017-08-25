export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfSafeTiles = numberOfRows * numberOfColumns - numberOfBombs;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  static get neighborOffsets() {
    return [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0,1], [1, -1], [1, 0], [1, 1]];
  }

  toString() {
    return this._playerBoard.map(element => element.join(' | ')).join('\n');
  }

  hasBomb(x, y) {
    return this._bombBoard[x][y] === 'B';
  }

  flipTile(x, y) {
    if (this._playerBoard[x][y] === ' ') {
      this._playerBoard[x][y] = this.getNumberOfNeighborBombs(x, y);
      this._numberOfSafeTiles--;
    } else {
      console.log('The tile has already been flipped.');
    }
  }

  getNumberOfNeighborBombs(x, y) {
    const neighbors =
      Board.neighborOffsets
        .map(coords => {
          return [coords[0] + x, coords[1] + y];
        })
        .filter(coords =>
          coords[0] >= 0 && coords[0] < this._numberOfRows &&
          coords[1] >= 0 && coords[1] < this._numberOfColumns);

    return neighbors.filter(coords => this.hasBomb.apply(this, coords)).length;
  }

  hasSafeTiles() {
    return this._numberOfSafeTiles > 0;
  }

  static generateEmptyBoard(numberOfRows, numberOfColumns) {
    const board = [];
    for (let i = 0; i < numberOfRows; i++) {
      board.push([]);
      for (let j = 0; j < numberOfColumns; j++) {
        board[i].push(null);
      }
    }
    return board;
  };

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = Board.generateEmptyBoard(numberOfRows, numberOfColumns);
    return board.map(row => row.map(() => ' '));
  };

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = Board.generateEmptyBoard(numberOfRows, numberOfColumns);

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

}
