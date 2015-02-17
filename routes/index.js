var express = require('express'),
          _ = require('lodash'),
      Board = require('../lib/board.js'),
      jade  = require('jade');
     router = express.Router(),
     path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SNAKE' });
});

/* GET new game */
var board;
router.get('/newGame', function(req, res, next) {
  // console.log('before board');
  board = new Board(); // Create a new board
  // console.log('after board');
  
  var htmlBoard = jade.renderFile(path.join(__dirname, '../views') + '/board.jade', {board: board.board});
  res.send({
    board: board.board,
    head: board.snake.head(),
    food: board.food,
    html: htmlBoard
  });
});

router.post('/move', function(req, res, next) {
  var body = req.body;
  if(!board){
    res.render('error');
  }
  board.snake.move(body.direction);
  if(board.gameOver){
    res.send('gameOver');
    return;
  }
  var htmlBoard = jade.renderFile(path.join(__dirname, '../views') + '/board.jade', {board: board.board});
  res.send({
    board: board.board,
    head: board.snake.head(),
    food: board.food,
    html: htmlBoard
  });
});

module.exports = router;
