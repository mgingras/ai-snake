var _ = require('lodash'),
Snake = require('./snake.js');

function Board() {
  this.height = 20;
  this.width = this.height;
  
  this._placeBoard();
  this.snake = new Snake(this);
  this._placeSnake();
  this._placeFood();
  
}

// Place walls and empty slots
Board.prototype._placeBoard = function() {
  var board = [];
  for (var x = 0; x < this.width; x++) {
    board[x] = [];
    for (var y = 0; y < this.height; y++) {
      if(x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1){
        board[x][y] = {
          type: 'wall'
        };
      } else {
        board[x][y] = {
          type: 'empty'
        };
      }
    }
  }
  this.board = board;
};

// Place snake on board
Board.prototype._placeSnake = function() {
  if(this._detectCollision()){
    return;
  }
  for (var i = 0; i < this.snake.body.length; i++) {
    var snakePiece = this.snake.body[i];
    this.board[snakePiece.pos.y][snakePiece.pos.x] = snakePiece;
  }
};

// Place new piece of food on the board
Board.prototype._placeFood = function() {
  if(!this.food){
    this.food = {};
  }
  var foodX = this.food.x || 0, foodY = this.food.y || 0;
  var positionFood = function() {
    foodX = Math.floor(Math.random() * (this.width - 2)) + 1;
    foodY = Math.floor(Math.random() * (this.height - 2)) + 1;
  }.bind(this);
  while(this.board[foodY][foodX].type !== 'empty'){
    positionFood();
  }
  this.food = {
    x: foodX,
    y: foodY
  };
  this.board[foodY][foodX] = {type: 'food'};
};

Board.prototype.update = function(arguments) {
  this._placeBoard();
  this._placeSnake();
  this._placeFood();
}

Board.prototype._detectCollision = function() {
  var headX = this.snake.head().pos.x;
  var headY = this.snake.head().pos.y;
  var collision = false;
  if(headX <= 0 || headX >= this.width - 1 || headY <= 0 || headY >= this.height - 1) {
    collision = true;
  }
  for (var i = 1; i < this.snake.body.length; i++) {
    if(this.snake.body[i].pos.x == headX && this.snake.body[i].pos.y == headY){
      collision = true;
    }
  }
  if(collision){
    this.gameOver = true;
    return true;
  }
  return false;
}

module.exports = Board;
