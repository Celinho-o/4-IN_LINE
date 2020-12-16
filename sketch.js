function make2DArray(rows, cols) {
  var arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

var grid;
var gridH;
var rows = 6;
var cols = 7;
var w = 66.6;
var currentPlayer = 0;
var openSpaces = rows * cols;
var result;
var playerTime;

function setup() {
  createCanvas(467, 400);

  playerTime = createP('');
  playerTime.html(`Play as <span class="player${currentPlayer}"></span>`);
  playerTime.style('font-size', '32pt');

  grid = make2DArray(rows, cols);
  gridH = make2DArray(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = -1;
      gridH[i][j] = 0;
    }
  }
}

function setPiece(col) {
  for (let i = rows - 1; i >= 0; i--) {
    if (grid[i][col] == -1) {
      grid[i][col] = currentPlayer;
      openSpaces--;
      if (currentPlayer == 0) {
        currentPlayer = 1;
      } else {
        currentPlayer = 0;
      }
      playerTime.html(`Play as <span class="player${currentPlayer}"></span>`);
      return;
    }
  }
}
function mousePressed() {
  let i = floor(mouseY / w);
  let j = floor(mouseX / w);

  if (i < rows && j < cols && result == null) {

    setPiece(j);

    result = checkWinner();
    if (result != null) {
      playerTime.html('');
      let resultP = createP('');
      resultP.style('font-size', '32pt');
      if (result == 'tie') {
        resultP.html('Tie!');
      } else {
        resultP.html(`<span class="player${result}"></span> Wins!`);
      }
      setTimeout(() => {
        noLoop();
      }, 500);
    }

  }
}

function p(row, col) {
  // If pos is valid
  if (!(row < 0 || col < 0 || row >= rows || col >= cols)) {
    return grid[row][col];
  } else {
    return -1;
  }

}

function checkWinner() {

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Horizontal
      if (p(i, j) != -1 && p(i, j) == p(i, j + 1) && p(i, j) == p(i, j + 2) && p(i, j) == p(i, j + 3)) {
        return p(i, j);
      }
      // Vertical
      if (p(i, j) != -1 && p(i, j) == p(i + 1, j) && p(i, j) == p(i + 2, j) && p(i, j) == p(i + 3, j)) {
        return p(i, j);
      }

      for (let k = -1; k <= 1; k++) {
        if (p(i, j) != -1 && p(i, j) == p(i + 1 * k, j + 1) && p(i, j) == p(i + 2 * k, j + 2) && p(i, j) == p(i + 3 * k, j + 3)) {
          return p(i, j);
        }
      }

    }
  }

  if (openSpaces == 0) {
    return 'tie';
  }

  return null;
}

function draw() {
  
  background(150);
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      stroke(0);

      rect(j * w, i * w, w, w, 25);
      
      if (grid[i][j] === 1) {
        fill(255, 0, 0);
  
        if (gridH[i][j] < floor(i * w + w / 2)) {
          gridH[i][j] += 30;
        } else {
          gridH[i][j] = floor(i * w + w / 2);
        }
        ellipse(j * w + w / 2, gridH[i][j], w * 0.9);
      } else if (grid[i][j] === 0) {
        fill(255, 255, 0);
        if (gridH[i][j] < floor(i * w + w / 2)) {
          gridH[i][j] += 30;
        } else {
          gridH[i][j] = floor(i * w + w / 2);
        }
        ellipse(j * w + w / 2, gridH[i][j], w * 0.9);
      }
      fill(255);
    }
  }
}