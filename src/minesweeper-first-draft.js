const board = {
  rows: [[' ', ' ', ' '],
         [' ', ' ', ' '],
         [' ', ' ', ' ']],

  print() {
    const printedRows = this.rows.map(element => element.join(' | '));
    let printedBoard = 'Current Board: \n';
    printedBoard += printedRows.join('\n');
    return printedBoard;
  },
};

console.log(board.print());

board.rows[0][1] = '1';
board.rows[2][2] = 'B';

console.log(board.print());
