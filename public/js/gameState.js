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
function renderBoard(locals) {
var jade_debug = [{ lineno: 1, filename: "views/board.jade" }];
try {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (JSON, board, undefined) {
jade_debug.unshift({ lineno: 0, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 1, filename: "views/board.jade" });
buf.push("<div class=\"board\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 2, filename: "views/board.jade" });
buf.push("<div>");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 3, filename: "views/board.jade" });
buf.push("<p style=\"position:absolute;top:0;left:5;font-size:10px;\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 3, filename: jade_debug[0].filename });
buf.push("Press esc to return to main menu");
jade_debug.shift();
jade_debug.shift();
buf.push("</p>");
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.unshift({ lineno: 4, filename: "views/board.jade" });
// iterate board
;(function(){
  var $$obj = board;
  if ('number' == typeof $$obj.length) {

    for (var y = 0, $$l = $$obj.length; y < $$l; y++) {
      var row = $$obj[y];

jade_debug.unshift({ lineno: 4, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 5, filename: "views/board.jade" });
// iterate row
;(function(){
  var $$obj = row;
  if ('number' == typeof $$obj.length) {

    for (var x = 0, $$l = $$obj.length; x < $$l; x++) {
      var block = $$obj[x];

jade_debug.unshift({ lineno: 5, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 6, filename: "views/board.jade" });
block = board[x][y]
jade_debug.shift();
jade_debug.unshift({ lineno: 7, filename: "views/board.jade" });
if ( block.type === 'wall')
{
jade_debug.unshift({ lineno: 8, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 8, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','wall',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 10, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'empty')
{
jade_debug.unshift({ lineno: 11, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 11, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','empty',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 13, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'head')
{
jade_debug.unshift({ lineno: 14, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 14, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','snake','head',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 16, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'body')
{
jade_debug.unshift({ lineno: 17, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 17, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','snake','body',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 19, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'tail')
{
jade_debug.unshift({ lineno: 20, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 20, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','snake','tail',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 22, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'food')
{
jade_debug.unshift({ lineno: 23, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 23, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','food',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 25, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
jade_debug.shift();
jade_debug.shift();
    }

  } else {
    var $$l = 0;
    for (var x in $$obj) {
      $$l++;      var block = $$obj[x];

jade_debug.unshift({ lineno: 5, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 6, filename: "views/board.jade" });
block = board[x][y]
jade_debug.shift();
jade_debug.unshift({ lineno: 7, filename: "views/board.jade" });
if ( block.type === 'wall')
{
jade_debug.unshift({ lineno: 8, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 8, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','wall',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 10, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'empty')
{
jade_debug.unshift({ lineno: 11, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 11, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','empty',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 13, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'head')
{
jade_debug.unshift({ lineno: 14, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 14, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','snake','head',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 16, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'body')
{
jade_debug.unshift({ lineno: 17, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 17, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','snake','body',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 19, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'tail')
{
jade_debug.unshift({ lineno: 20, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 20, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','snake','tail',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 22, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'food')
{
jade_debug.unshift({ lineno: 23, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 23, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','food',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 25, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
jade_debug.shift();
jade_debug.shift();
    }

  }
}).call(this);

jade_debug.shift();
jade_debug.shift();
    }

  } else {
    var $$l = 0;
    for (var y in $$obj) {
      $$l++;      var row = $$obj[y];

jade_debug.unshift({ lineno: 4, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 5, filename: "views/board.jade" });
// iterate row
;(function(){
  var $$obj = row;
  if ('number' == typeof $$obj.length) {

    for (var x = 0, $$l = $$obj.length; x < $$l; x++) {
      var block = $$obj[x];

jade_debug.unshift({ lineno: 5, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 6, filename: "views/board.jade" });
block = board[x][y]
jade_debug.shift();
jade_debug.unshift({ lineno: 7, filename: "views/board.jade" });
if ( block.type === 'wall')
{
jade_debug.unshift({ lineno: 8, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 8, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','wall',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 10, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'empty')
{
jade_debug.unshift({ lineno: 11, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 11, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','empty',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 13, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'head')
{
jade_debug.unshift({ lineno: 14, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 14, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','snake','head',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 16, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'body')
{
jade_debug.unshift({ lineno: 17, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 17, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','snake','body',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 19, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'tail')
{
jade_debug.unshift({ lineno: 20, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 20, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','snake','tail',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 22, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'food')
{
jade_debug.unshift({ lineno: 23, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 23, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','food',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 25, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
jade_debug.shift();
jade_debug.shift();
    }

  } else {
    var $$l = 0;
    for (var x in $$obj) {
      $$l++;      var block = $$obj[x];

jade_debug.unshift({ lineno: 5, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 6, filename: "views/board.jade" });
block = board[x][y]
jade_debug.shift();
jade_debug.unshift({ lineno: 7, filename: "views/board.jade" });
if ( block.type === 'wall')
{
jade_debug.unshift({ lineno: 8, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 8, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','wall',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 10, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'empty')
{
jade_debug.unshift({ lineno: 11, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 11, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','empty',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 13, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'head')
{
jade_debug.unshift({ lineno: 14, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 14, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','snake','head',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 16, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'body')
{
jade_debug.unshift({ lineno: 17, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 17, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','snake','body',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 19, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'tail')
{
jade_debug.unshift({ lineno: 20, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 20, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','snake','tail',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 22, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
else if ( block.type === 'food')
{
jade_debug.unshift({ lineno: 23, filename: "views/board.jade" });
jade_debug.unshift({ lineno: 23, filename: "views/board.jade" });
buf.push("<div" + (jade.cls(['block','food',"" + (JSON.stringify(block.pos)) + " " + (x) + "-" + (y) + ""], [null,null,true])) + ">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 25, filename: "views/board.jade" });
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
}
jade_debug.shift();
jade_debug.shift();
    }

  }
}).call(this);

jade_debug.shift();
jade_debug.shift();
    }

  }
}).call(this);

jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();}.call(this,"JSON" in locals_for_with?locals_for_with.JSON:typeof JSON!=="undefined"?JSON:undefined,"board" in locals_for_with?locals_for_with.board:typeof board!=="undefined"?board:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
} catch (err) {
  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, ".board\n  div\n    p(style='position:absolute;top:0;left:5;font-size:10px;') Press esc to return to main menu\n  each row, y in board\n    each block, x in row\n      -block = board[x][y]\n      if block.type === 'wall'\n        .block.wall(class=\"#{JSON.stringify(block.pos)} #{x}-#{y}\")\n          //- p(style=\"color:red;font-size:10px;\")=JSON.stringify(block.pos)\n      else if block.type === 'empty'\n        .block.empty(class=\"#{JSON.stringify(block.pos)} #{x}-#{y}\")\n          //- p(style=\"color:red;font-size:10px;\")=JSON.stringify(block.pos)\n      else if block.type === 'head'\n        .block.snake.head(class=\"#{JSON.stringify(block.pos)} #{x}-#{y}\")\n          //- p(style=\"color:red;font-size:10px;\")=JSON.stringify(block.pos)\n      else if block.type === 'body'\n        .block.snake.body(class=\"#{JSON.stringify(block.pos)} #{x}-#{y}\")\n          //- p(style=\"color:red;font-size:10px;\")=JSON.stringify(block.pos)\n      else if block.type === 'tail'\n        .block.snake.tail(class=\"#{JSON.stringify(block.pos)} #{x}-#{y}\")\n          //- p(style=\"color:red;font-size:10px;\")=JSON.stringify(block.pos)\n      else if block.type === 'food'\n        .block.food(class=\"#{JSON.stringify(block.pos)} #{x}-#{y}\")\n          //- p(style=\"color:red;font-size:10px;\")=JSON.stringify(block.pos)\n");
}
}
