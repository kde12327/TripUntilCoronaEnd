var express = require('express');
var router = express.Router();

var testRouter = require('./test');
router.use('/test', testRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'TUCE' });
});

module.exports = router;
