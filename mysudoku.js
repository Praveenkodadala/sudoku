

function emptyCells( board) {
    let empty = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                let boxRow = 3* Math.floor( i/3);
                let boxCol = 3* Math.floor( j/3);
                empty.push([i,j, boxRow, boxCol]);
            }
        }
    }
    return empty;
}

function isUnique( board, empty, value) {
    let row, col;

    // test row
    row = board[empty[0]];
    for( col = 0; col < 9; ++ col) {
        if( value == row[col]) {
            return false;
        }
    }
    // test col
    col = empty[1];
    for( let row = 0; row < 9; ++row) {
        if( value == board[ row][col]){
            return false;
        }	
    }
    // test box
    let boxRow = empty[2];
    let boxCol = empty[3];
    for( let i = 3; i--;) {
        row = board[ boxRow++];
        for( let j = 3; j--;) {
            if( row[boxCol + j] == value) {
                return false;
            }
        }
    }
    return true;
}

let solve = function (board) {
    let empty = emptyCells( board);

    nextEmpty:
    for (let i = 0; i < empty.length;) { // We check every possible value for all empty 1x1 squares.
        let row = empty[i][0]; // Used for row and 3x3 square checks
        let column = empty[i][1]; // Used for column and 3x3 square checks
        let value = board[row][column] + 1; // We start at 1, because obviously 0 is not a Sudoku value.   
        let cell = empty[i];

        while (value <= 9) { // test values up to 9.
            if( isUnique( board, cell, value)) {
                board[row][column] = value; // We assign said value to the corresponding board 1x1 square, for now.
                i++; // Move on to the check next empty cell.
                continue nextEmpty;
            }
            value++; // If the value is invalid, we simply try the next possible value.    
        }

        board[row][column] = 0;
        if( i == 0) {  // board is not solvable
            return null;
        }
        i--; // We go back to the previous 1x1 square to try a different value.
    }
    return board;
};
let board = [
    [4,0,0,6,0,7,0,8,5],
    [0,0,0,0,0,0,6,0,0],
    [0,0,7,0,0,0,0,0,0],
    [0,5,0,0,0,3,0,0,4],
    [3,7,0,0,0,8,0,0,0],
    [6,0,0,2,0,0,0,0,0],
    [8,0,0,0,0,0,3,1,0],
    [0,3,1,0,4,9,0,0,0],
    [0,0,0,0,0,0,0,0,9]
];

solve(board);


console.log( board.map( row=> row.join(',')).join('\n'));
