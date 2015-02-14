var express = require('express'),
          _ = require('lodash'),
      Board = require('../lib/Board');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SNAKE' });
});

/* GET new game */
var board;
router.get('/newGame', function(req, res, next) {
  console.log('before board');
  board = new Board(); // Create a new board
  console.log('after board');
  res.render('board', {board: board.board});
});

router.post('/move', function(req, res, next) {
  var body = req.body;
  board.snake.move(body.direction);
  if(board.gameOver){
    res.send('gameOver');
    return;
  }
  res.render('board', {board: board.board});
});

module.exports = router;
