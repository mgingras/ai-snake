var direction = 'NONE',
  moving,
  gameType = 'interactive',
  board;
var visited = []; // Nodes visited by the algorithm
var route;        // Route for snake to take.
  
$(function() {
  $(document).on('keydown', function(e) {
    if(e.keyCode  === 32){
      gameType = $("input[type='radio'][name='algorithmRadios']:checked").val();
      newGame();
    }
  });
})

function newGame() {
  if(moving){
    clearInterval(moving);
    moving = undefined;
  }
  $.get('/newGame', function(newBoard) {
    $('body').html(newBoard.html);
    board = newBoard.board;
    registerHandlers();
  });
}

function registerHandlers() {
  $(document).off('keydown').on('keydown', function(e) {
    if(gameType === 'interactive'){
      if(e.keyCode === 37){
        // Left
        console.log('Left');
        direction = 'LEFT';
        if(!moving){
          startMoving();
        }
      } else if(e.keyCode === 39){
        // Right
        console.log('Right');
        direction = 'RIGHT';
        if(!moving){
          startMoving();
        }
      } else if(e.keyCode === 38){
        // UP
        console.log('UP');
        direction = 'UP';
        if(!moving){
          startMoving();
        }
      } else if(e.keyCode === 40){
        // Down
        console.log('DOWN');
        direction = 'DOWN';
        if(!moving){
          startMoving();
        }
      }
    }
    if(e.keyCode === 27){
      newGame();
    }
  });
}

function startMoving() {
  moving = setInterval(function() {
    // console.log('Move: ' + direction);
    if(gameType === 'DFS'){
      if(route.length > 0){
        direction = route.pop().dir;
      }
      else {
        clearInterval(moving);
        clearBoard();
        doDFS();
      }
    }
    $.post('/move', {direction: direction}, function(updatedBoard) {
      if(updatedBoard === 'gameOver'){
        newGame()
        alert('Game Over');
      }
      board = updatedBoard.board;
      $('body').html(updatedBoard.html);
    });
  }, 50);
}

function getHead(){
  for (var x = 0; x < board.length; x++) {
    for (var y = 0; y < board.length; y++) {
      if(board[x][y].type === 'head'){
        // console.log('x: ' + x + ' y: ' + y);
        return board[x][y];
      }
    }
  }
}

function DFS(node, queue){
  if(!queue){
    queue = [];
  }
  
  if(node.visited){
    return false;
  }

  node.visited = true;
  if(node.type === 'wall' || node.type === 'body' || node.type === 'tail'){
    return false;
  } else if(node.type === 'food'){
    console.log("FOOD");
    return true;
  }
  console.log('x: %d y: %d', node.pos.x, node.pos.y);
  if(node.type !== 'head'){
    visited.push({
      pos: node.pos
    });
  }
  if(DFS(board[node.pos.x][node.pos.y - 1], queue)){
    console.log("UP");
    // UP
    if(node.type !== 'head'){
      queue.push({
        pos: node.pos,
        dir: 'UP'
      });
    }
    // queue.push('UP');
    return queue;
  }  else if(DFS(board[node.pos.x - 1][node.pos.y], queue)){
    console.log("LEFT");
    // LEFT
    if(node.type !== 'head'){
      queue.push({
        pos: node.pos,
        dir: 'LEFT'
      });
    }
    // queue.push('LEFT');
    return queue;
  } else if(DFS(board[node.pos.x + 1][node.pos.y], queue)){
    // RIGHT
    console.log("RIGHT");
    if(node.type !== 'head'){
      queue.push({
        pos: node.pos,
        dir: 'RIGHT'
      });
    }
    // queue.push('RIGHT');
    return queue;
  } else if(DFS(board[node.pos.x][node.pos.y + 1], queue)){
    console.log("DOWN");
    // DOWN
    if(node.type !== 'head'){
      queue.push({
        pos: node.pos,
        dir: 'DOWN'
      });
    }
    // queue.push('DOWN');
    return queue;
  }
  console.dir(node.pos);
  
}

function doDFS(){
  route = DFS(getHead());
  drawRoute(route);
  setTimeout(function() {
    startMoving();
  }, 2000);
}
function drawVisited(){
  drawRoute(visited.reverse());
}

function drawRoute (route) {
  for(var block in route){
    $('.' + route[block].pos.x +'-'+ route[block].pos.y).css('background-color', 'orange');
    $('.' + route[block].pos.x +'-'+ route[block].pos.y).html(route.length - block);
  }
}
function clearBoard(){
  for (var x = 0; x < board.length; x++) {
    for (var y = 0; y < board.length; y++) {
      board[x][y].visited = false;
    }
  }
}
