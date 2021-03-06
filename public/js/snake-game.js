var direction = 'NONE',
    moving,
    gameType = 'interactive',
    board;

var route;        // Route for snake to take
var head;         // Head of the snake
var food;         // Where the food is

$(function() {
  $(document).on('keydown', function(e) {
    if(e.keyCode  === 32){
      gameType = $("input[type='radio'][name='algorithmRadios']:checked").val();
      newGame();
    }
  });
});

function newGame() {
  if(moving){
    clearInterval(moving);
    moving = undefined;
  }
  var newBoard = newSnakeGame();
  $('.boardContainer').html(newBoard.html);
  head = newBoard.head;
  board = newBoard.board;
  food = newBoard.food;
  registerHandlers();
  if(gameType === 'DFS'){
    doDFS();
  } else if(gameType === 'BFS'){
    doBFS();
  } else if(gameType === 'aStar'){
    doAStar();
  }
}

function registerHandlers() {
  $(document).off('keydown').on('keydown', function(e) {
    if(gameType === 'interactive'){
      if(e.keyCode === 37){
        // LEFT
        direction = 'LEFT';
        if(!moving){
          startMoving();
        }
      } else if(e.keyCode === 39){
        // RIGHT
        direction = 'RIGHT';
        if(!moving){
          startMoving();
        }
      } else if(e.keyCode === 38){
        // UP
        direction = 'UP';
        if(!moving){
          startMoving();
        }
      } else if(e.keyCode === 40){
        // DOWN
        direction = 'DOWN';
        if(!moving){
          startMoving();
        }
      }
    }
    if(e.keyCode === 27){
      location.reload();
    }
  });
}

function startMoving() {
  if(moving){
    return;
  }
  moving = setInterval(function() {
    if(gameType !== 'interactive'){
      if(route && route.length > 0){
        direction = route.pop().dir;
      }
      else {
        clearInterval(moving);
        moving = undefined;
        clearBoard();
        if(gameType === 'DFS'){
          return doDFS();
        } else if(gameType === 'BFS'){
          return doBFS();
        } else if(gameType === 'aStar'){
          return doAStar();
        }
      }
    }
    var updatedBoard = moveSnake(direction);
    if(updatedBoard === 'gameOver'){
      // $('#gameOverModal').modal('show');
      alert('game over');
      newGame();
    }
    head = updatedBoard.head;
    food = updatedBoard.food;
    board = updatedBoard.board;
    $('.boardContainer').html(updatedBoard.html);
  }, 75);
}

function getHead(){
  if(head){
    return head;
  }
  for (var x = 0; x < board.length; x++) {
    for (var y = 0; y < board.length; y++) {
      if(board[x][y].type === 'head'){
        return board[x][y];
      }
    }
  }
}

// BFS CODE
function BFS (node) {
  var queue = [];
  var found = false;
  while(!found){
    if(!board[node.pos.x][node.pos.y].visited && node.type !== 'border' && node.type !== 'wall' && node.type !== 'body' && node.type !== 'tail'){
      if(node.path){
        node.path.push(node);
      } else{
        node.path = [];
      }

      if(node.type === 'food'){
        return node.path;
      }

      if(!board[node.pos.x][node.pos.y - 1].visited){
        queue.push(_.merge(board[node.pos.x][node.pos.y - 1], {path: _.clone(node.path), dir: 'UP'}));
      }
      if(!board[node.pos.x][node.pos.y + 1].visited){
        queue.push(_.merge(board[node.pos.x][node.pos.y + 1], {path: _.clone(node.path), dir: 'DOWN'}));
      }
      if(!board[node.pos.x - 1][node.pos.y].visited){
        queue.push(_.merge(board[node.pos.x - 1][node.pos.y], {path: _.clone(node.path), dir: 'LEFT'}));
      }
      if(!board[node.pos.x + 1][node.pos.y].visited){
        queue.push(_.merge(board[node.pos.x + 1][node.pos.y], {path: _.clone(node.path), dir: 'RIGHT'}));
      }
    }
    board[node.pos.x][node.pos.y].visited = true; // Visited this node
    if(queue.length > 0){
      node = queue.shift();
    } else{
      return false;
    }
  }
}
function doBFS () {
  route = BFS(getHead());
  if(!route){
    alert('Snake isn\'t smart enough to figure this one out');
    newGame();
  } else{
    _(route).reverse().value();
    drawRoute();
  }
  // startMoving();
  setTimeout(function() {
    startMoving();
  }, 2000);
}

// DFS CODE
var iDFS;
function DFS(node, queue){
  if(!queue){
    queue = [];
  }
  if(node.visited){
    return false;
  }
  board[node.pos.x][node.pos.y].visited = true;
  if(node.type === 'wall' || node.type === 'body' || node.type === 'tail' || node.type === 'border'){
    return false;
  } else if(node.type === 'food'){
    return true;
  }
  if(DFS(board[node.pos.x][node.pos.y - 1], queue)){
    // UP
      queue.push({
        pos: node.pos,
        dir: 'UP'
      });
    return queue;
  }  else if(DFS(board[node.pos.x + 1][node.pos.y], queue)){
    // RIGHT
      queue.push({
        pos: node.pos,
        dir: 'RIGHT'
      });
    return queue;
  }  else if(DFS(board[node.pos.x][node.pos.y + 1], queue)){
    // DOWN
      queue.push({
        pos: node.pos,
        dir: 'DOWN'
      });
    return queue;
  } else if(DFS(board[node.pos.x - 1][node.pos.y], queue)){
    // LEFT
      queue.push({
        pos: node.pos,
        dir: 'LEFT'
      });
    return queue;
  }
}

function doDFS(){
  route = DFS(getHead());
  if(!route){
    alert('Snake isn\'t smart enough to figure this one out');
    newGame();
  } else{
    drawRoute();
  }
  setTimeout(function() {
    startMoving();
  }, 2000);
}

// HELPERS
function clearBoard(){
  for (var x = 0; x < board.length; x++) {
    for (var y = 0; y < board.length; y++) {
      board[x][y].path = undefined;
      board[x][y].visited = false;
      board[x][y].score = undefined;
      board[x][y].hScore = undefined;
      board[x][y].gScore = undefined;
    }
  }
}

// A* Shyt
function aStar (node) {
  node.path = [];
  node.gScore = 0;
  node.score = 9999;
  var passed = {};
  var validNode = function(n) {
    return n.type !== 'wall' && n.type !== 'body' &&
           n.type !== 'tail' && n.type !== 'border' &&
           n.type !== 'head' && !n.score;
  };
  var sortAsNumbers = function(a,b){return Number(a) - Number(b);};

  var past = [];
  while(true){
    gScore(node);
    hScore(node);


    if(node.type === 'food'){
      return node.path;
    }


    // UP
    if(validNode(board[node.pos.x][node.pos.y - 1])){
      if(gameType === 'aStar'){
        board[node.pos.x][node.pos.y - 1].score = board[node.pos.x][node.pos.y - 1].hScore + board[node.pos.x][node.pos.y - 1].gScore;
      }

      board[node.pos.x][node.pos.y - 1].path = _.clone(node.path);
      board[node.pos.x][node.pos.y - 1].path.push({
        pos: node.pos,
        dir: 'UP'
      });
      if(!passed[board[node.pos.x][node.pos.y - 1].score]){
        passed[board[node.pos.x][node.pos.y - 1].score] = [];
      }
      passed[board[node.pos.x][node.pos.y - 1].score].push(_.clone(board[node.pos.x][node.pos.y - 1]));
    }
    // DOWN
    if(validNode(board[node.pos.x][node.pos.y + 1])){
      if(gameType === 'aStar'){
        board[node.pos.x][node.pos.y + 1].score = board[node.pos.x][node.pos.y + 1].hScore + board[node.pos.x][node.pos.y + 1].gScore;
      }

      board[node.pos.x][node.pos.y + 1].path = _.clone(node.path);
      board[node.pos.x][node.pos.y + 1].path.push({
        pos: node.pos,
        dir: 'DOWN'
      });
      if(!passed[board[node.pos.x][node.pos.y + 1].score]){
        passed[board[node.pos.x][node.pos.y + 1].score] = [];
      }
      passed[board[node.pos.x][node.pos.y + 1].score].push(_.clone(board[node.pos.x][node.pos.y + 1]));
    }
    // RIGHT
    if(validNode(board[node.pos.x + 1][node.pos.y])){
      if(gameType === 'aStar'){
        board[node.pos.x + 1][node.pos.y].score = board[node.pos.x + 1][node.pos.y].hScore + board[node.pos.x + 1][node.pos.y].gScore;
      }

      board[node.pos.x + 1][node.pos.y].path = _.clone(node.path);
      board[node.pos.x + 1][node.pos.y].path.push({
        pos: node.pos,
        dir: 'RIGHT'
      });
      if(!passed[board[node.pos.x + 1][node.pos.y].score]){
        passed[board[node.pos.x + 1][node.pos.y].score] = [];
      }
      passed[board[node.pos.x + 1][node.pos.y].score].push(_.clone(board[node.pos.x + 1][node.pos.y]));
    }
    // LEFT
    if(validNode(board[node.pos.x - 1][node.pos.y])){
      if(gameType === 'aStar'){
        board[node.pos.x - 1][node.pos.y].score = board[node.pos.x - 1][node.pos.y].hScore + board[node.pos.x - 1][node.pos.y].gScore;
      }
      board[node.pos.x - 1][node.pos.y].path = _.clone(node.path);
      board[node.pos.x - 1][node.pos.y].path.push({
        pos: node.pos,
        dir: 'LEFT'
      });
      if(!passed[board[node.pos.x - 1][node.pos.y].score]){
        passed[board[node.pos.x - 1][node.pos.y].score] = [];
      }
      passed[board[node.pos.x - 1][node.pos.y].score].push(_.clone(board[node.pos.x - 1][node.pos.y]));
    }
    var best = _.keys(passed).sort(sortAsNumbers)[0]; // For decimal weights
    // $('.'+node.pos.x+'-'+node.pos.y).css('background-color', 'pink');
    if(best){
      node = passed[best].pop();
    } else {
      return;
    }
    // $('.'+node.pos.x+'-'+node.pos.y).css('background-color', 'purple');
    if(passed[best].length === 0){
      delete passed[best];
    }
  }
}

// Heuristics
// Moving from start to a given node
function gScore (node) {
  // UP
  board[node.pos.x][node.pos.y - 1].gScore = (node.gScore + 1);
  // DOWN
  board[node.pos.x][node.pos.y + 1].gScore = (node.gScore + 1);
  // LEFT
  board[node.pos.x - 1][node.pos.y].gScore = (node.gScore + 1);
  // RIGHT
  board[node.pos.x + 1][node.pos.y].gScore = (node.gScore + 1);
}

// Moving from given node to end by Manhattan method
function hScore (node) {
  var calculateDistance = function(n){
    return Math.abs(n.pos.x - food.x) + Math.abs(n.pos.y - food.y);
  };
  // UP
  board[node.pos.x][node.pos.y - 1].hScore = calculateDistance(board[node.pos.x][node.pos.y - 1]);
  // DOWN
  board[node.pos.x][node.pos.y + 1].hScore = calculateDistance(board[node.pos.x][node.pos.y + 1]);
  // LEFT
  board[node.pos.x - 1][node.pos.y].hScore = calculateDistance(board[node.pos.x - 1][node.pos.y]);
  // RIGHT
  board[node.pos.x + 1][node.pos.y].hScore = calculateDistance(board[node.pos.x + 1][node.pos.y]);
}

function doAStar () {
  route = aStar(getHead());
  if(!route){
    alert('Snake isn\'t smart enough to figure this one out');
    newGame();

  } else {
    route = _(route).reverse().value();
    drawRoute();
  }
  // startMoving();
  setTimeout(function() {
    startMoving();
  }, 2000);
}

function drawVisited(){
  drawRoute(visited.reverse());
}

function drawRoute () {
  if(!route){
    return;
  }
  var len = route.length;
  var offset = (gameType === 'DFS' || gameType === 'aStar') ? -1 : 0;
  for(var block in route){
    if(block == len + offset){
      return;
    }
    if(block === '0' && gameType === 'BFS'){
      continue;
    }
    $('.' + route[block].pos.x +'-'+ route[block].pos.y).css('background-color', 'orange');
    $('.' + route[block].pos.x +'-'+ route[block].pos.y).html(route.length - block + offset);
  }
}
