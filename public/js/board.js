function Board() {
  this.height = 20;
  this.width = this.height;

  this._placeBoard();
  this.snake = new Snake(this);
  this._placeSnake();
  this._placeWalls(25);
  this._placeFood();

}

Board.prototype.update = function() {
  this._placeBoard();
  this._placeSnake();
  this._placeWalls();
  this._placeFood();
};

// Place walls and empty slots
Board.prototype._placeBoard = function() {
  var board = [];
  for (var x = 0; x < this.width; x++) {
    board[x] = [];
    for (var y = 0; y < this.height; y++) {
      if(x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1){
        board[x][y] = {
          type: 'border'
        };
      } else {
        board[x][y] = {
          type: 'empty'
        };
      }
      board[x][y].pos = {
        x: x,
        y: y
      };
    }
  }
  this.board = board;
};

// Place snake on board
Board.prototype._placeSnake = function() {
  if(this._detectCollision()){
    return;
  }
  if(this._detectFood()){
    // GROW
  }
  for (var i = 0; i < this.snake.body.length; i++) {
    var snakePiece = this.snake.body[i];
    this.board[snakePiece.pos.x][snakePiece.pos.y] = snakePiece;
  }
};

// Place new piece of food on the board
Board.prototype._placeFood = function() {
  if(!this.food){
    var foodX = 0, foodY = 0;
    var positionFood = function() {
      foodX = Math.floor(Math.random() * (this.width - 2)) + 1;
      foodY = Math.floor(Math.random() * (this.height - 2)) + 1;
    }.bind(this);
    while(this.board[foodX][foodY].type !== 'empty'){
      positionFood();
    }
    this.food = {
      x: foodX,
      y: foodY
    };
  }
  this.board[this.food.x][this.food.y] = {
    type: 'food',
    pos: this.food
  };
};

Board.prototype._placeWalls = function(numberOfWalls) {
  if(!this.walls){
    this.walls = [];
    var wallX = 0, wallY = 0;
    var positionWalls = function() {
      wallX = Math.floor(Math.random() * (this.width - 2)) + 1;
      wallY = Math.floor(Math.random() * (this.height - 2)) + 1;
    }.bind(this);
    while(numberOfWalls > 0){
      while(this.board[wallX][wallY].type !== 'empty'){
        positionWalls();
      }
      this.board[wallX][wallY].type = 'wall';
      this.walls.push({
        type: 'wall',
        pos: {
          x: wallX,
          y: wallY
        }
      });
      numberOfWalls--;
    }
  }
  var wall;
  for (var i = 0; i < this.walls.length; i++) {
    wall = this.walls[i]
    this.board[wall.pos.x][wall.pos.y] = wall;
  }
};



Board.prototype._detectCollision = function() {
  var headX = this.snake.head().pos.x;
  var headY = this.snake.head().pos.y;
  var collision = false;
  // console.log(headX);
  // console.log(headY);

  // Hits wall
  if(headX <= 0 || headX >= this.width - 1 || headY <= 0 || headY >= this.height - 1) {
    collision = true;
  }
  // Hits self
  for (var i = 1; i < this.snake.body.length; i++) {
    if(this.snake.body[i].pos.x == headX && this.snake.body[i].pos.y == headY){
      collision = true;
    }
  }
  if(this.walls){
  // Hits wall
    var wall;
    for (var j = 0; j < this.walls.length; j++) {
      wall = this.walls[j];
      if(wall.pos.x === headX && wall.pos.y === headY){
        collision = true;
      }
    }
  }

  if(collision){
    this.gameOver = true;
    return true;
  }
  return false;
};

Board.prototype._detectFood = function() {
  if(!this.food){
    return false;
  }
  var headX = this.snake.head().pos.x;
  var headY = this.snake.head().pos.y;
  // console.log('s: x: %d y: %d', headX, headY);
  // console.log('f: x: %d y: %d', this.food.x, this.food.y);
  if(headX === this.food.x && headY === this.food.y){
    this.food = undefined;
    this.snake.length += 1;
    this.snake.body[this.snake.body.length - 1 ].type = 'body';
    this.snake.body.push({
        type: 'tail',
        pos : {
          x: this.snake.body[this.snake.body.length - 1 ].pos.x,
          y: this.snake.body[this.snake.body.length - 1 ].pos.y
        }
      });
    return true;
  }
  return false;
};
