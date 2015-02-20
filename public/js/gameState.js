var snakeBoard;
function newSnakeGame () {
  // console.log('before board');
  snakeBoard = new Board(); // Create a new board
  // console.log('after board');
  
  var htmlBoard = renderBoard({board: snakeBoard.board});
  return {
    board: snakeBoard.board,
    head: snakeBoard.snake.head(),
    food: snakeBoard.food,
    html: htmlBoard
  };
}

function moveSnake(moveDirection) {
  if(!snakeBoard){
    return {error: 'Error moving snake'};
  }
  snakeBoard.snake.move(moveDirection);
  if(snakeBoard.gameOver){
    return 'gameOver';
    return;
  }
  var htmlBoard = renderBoard({board: snakeBoard.board});
  return {
    board: snakeBoard.board,
    head: snakeBoard.snake.head(),
    food: snakeBoard.food,
    html: htmlBoard
  };
}
