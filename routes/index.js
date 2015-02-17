var express = require('express'),
     router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SNAKE' });
});

module.exports = router;
