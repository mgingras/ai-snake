var direction = 'NONE',
  moving,
  gameType = 'interactive',
  board;
var visited = []; // Nodes visited by the algorithm
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
})

function newGame() {
  if(moving){
    clearInterval(moving);
    moving = undefined;
  }
  $.get('/newGame', function(newBoard) {
    $('body').html(newBoard.html);
    head = newBoard.head;
    board = newBoard.board;
    food = newBoard.food;
    registerHandlers();
    if(gameType === 'DFS'){
      doDFS();
    } else if(gameType === 'BFS'){
      doBFS();
    }
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
      location.reload();
    }
  });
}

function startMoving() {
  moving = setInterval(function() {
    // console.log('Move: ' + direction);
    if(gameType !== 'interactive'){
      if(route.length > 0){
        direction = route.pop().dir;
      }
      else {
        clearInterval(moving);
        clearBoard();
        if(gameType === 'DFS'){
          return doDFS()
        }else if(gameType === 'BFS'){
          return doBFS();
        }
      }
    }
    $.post('/move', {direction: direction}, function(updatedBoard) {
      if(updatedBoard === 'gameOver'){
        newGame()
        alert('Game Over');
      }
      head = updatedBoard.head;
      food = updatedBoard.food;
      board = updatedBoard.board;
      $('body').html(updatedBoard.html);
    });
  }, 50);
}

function getHead(){
  if(head){
    return head;
  }
  for (var x = 0; x < board.length; x++) {
    for (var y = 0; y < board.length; y++) {
      if(board[x][y].type === 'head'){
        // console.log('x: ' + x + ' y: ' + y);
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
    // If it is a searchable node
    node = board[node.pos.x][node.pos.y];
    if(node.type !== 'wall' && node.type !== 'body' &&
       node.type !== 'tail' && !node.visited){
      
      // console.log('%s x: %d y: %d %s', node.type, node.pos.x, node.pos.y, node.visited);
      if(node.path){
        node.path.push(node);
      } else{
        node.path = [];
      }
      
      if(node.type === 'food'){
        return node.path;
      }
      
      queue = queue.concat([
        _.merge(board[node.pos.x][node.pos.y - 1], {path: node.path, dir: 'UP'}),
        _.merge(board[node.pos.x][node.pos.y + 1], {path: node.path, dir: 'DOWN'}),
        _.merge(board[node.pos.x - 1][node.pos.y], {path: node.path, dir: 'LEFT'}),
        _.merge(board[node.pos.x + 1][node.pos.y], {path: node.path, dir: 'RIGHT'})
      ]);
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
  route.reverse();
  drawRoute(route);
  setTimeout(function() {
    startMoving();
  }, 2000);
}

// DFS CODE
function DFS(node, queue){
  if(!queue){
    queue = [];
  }
  if(node.visited){
    return false;
  }
  board[node.pos.x][node.pos.y].visited = true;
  if(node.type === 'wall' || node.type === 'body' || node.type === 'tail'){
    return false;
  } else if(node.type === 'food'){
    // console.log("FOOD");
    return true;
  }
  // console.log('x: %d y: %d', node.pos.x, node.pos.y);
    visited.push({
      pos: node.pos
    });
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
  drawRoute();
  setTimeout(function() {
    startMoving();
  }, 2000);
}
function drawVisited(){
  drawRoute(visited.reverse());
}

function drawRoute () {
  var len = route.length;
  var offset = (gameType === 'DFS') ? -1 : 0;
  for(var block in route){
    if(block == len - 1 && gameType === 'DFS'){
      return;
    }
    if(block == 0 && gameType === 'BFS'){
      continue;
    }
    $('.' + route[block].pos.x +'-'+ route[block].pos.y).css('background-color', 'orange');
    $('.' + route[block].pos.x +'-'+ route[block].pos.y).html(route.length - block + offset);
  }
}
function clearBoard(){
  for (var x = 0; x < board.length; x++) {
    for (var y = 0; y < board.length; y++) {
      board[x][y].path = undefined;
      board[x][y].visited = false;
    }
  }
}
