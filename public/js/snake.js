function Snake(board) {
  this.board = board;
  var length = 5;
  var headX = Math.floor(Math.random() * (board.width - 2 - length)) + 1;
  var headY = Math.floor(Math.random() * (board.height - 2)) + 1;
  var body = [];
  this.direction = 'LEFT';
  
  for (var i = 0; i < length; i++) {
    if(i === 0){
      body[i] = {
        type: 'head',
        pos : {
          x: headX,
          y: headY
        }
      };
    } else if(i === length - 1){
      body[i] = {
        type: 'tail',
        pos : {
          x: headX + i,
          y: headY
        }
      };
    } else{
      body[i] = {
        type: 'body',
        pos : {
          x: headX + i,
          y: headY
        }
      };
    }
  }
  this.body = body;
}

Snake.prototype.head = function() {
  return this.body[0];
};

Snake.prototype.move = function(direction) {
  if(this.direction){
    var negate = false;
    if(direction === 'UP' && this.direction === 'DOWN'){
      negate = true;
    } else if(direction === 'DOWN' && this.direction === 'UP'){
      negate = true;
    } else if(direction === 'LEFT' && this.direction === 'RIGHT'){
      negate = true;
    } else if(direction === 'RIGHT' && this.direction === 'LEFT'){
      negate = true;
    }
    if(negate){
      direction = this.direction;
    }
  }
  for (var i = this.body.length - 1; i > 0; i--) {
    this.body[i].pos.x = this.body[i - 1].pos.x
    this.body[i].pos.y = this.body[i - 1].pos.y
  }
  if(direction === 'UP'){
    this.body[0].pos.y -= 1;
  } else if(direction === 'DOWN'){
    this.body[0].pos.y += 1;
  } else if(direction === 'LEFT'){
    this.body[0].pos.x -= 1;
  } else if(direction === 'RIGHT'){
    this.body[0].pos.x += 1;
  }
  this.direction = direction;
  this.board.update();
};
