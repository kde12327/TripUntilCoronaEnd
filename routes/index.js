var express = require('express');
var router = express.Router();

var testRouter = require('./test');
var apiRouter = require('./api');
router.use('/test', testRouter);
router.use('/api', apiRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'TUCE' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'TUCE' });
});

module.exports = router;
