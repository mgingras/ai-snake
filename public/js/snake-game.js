var direction = 'NONE';
var moving;

$(function() {
  $(document).on('keydown', function(e) {
    if(e.keyCode  === 32){
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
    $('body').html(newBoard);
    registerHandlers();
  });
}

function registerHandlers() {
  $(document).off('keydown').on('keydown', function(e) {
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
    } else if(e.keyCode === 27){
      newGame();
    }
  });
}

function startMoving() {
  moving = setInterval(function() {
    console.log('Move: ' + direction);
    $.post('/move', {direction: direction}, function(board) {
      if(board === 'gameOver'){
        newGame()
        alert('Game Over');
      }
      //  console.dir(board);
      $('body').html(board);
    });
  }, 100);
}
