var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/1', function(req, res, next) {
  res.render('test', { title: 'Test Page' });
});

/* GET home page. */
router.get('/2', function(req, res, next) {
  res.render('test2', { title: 'Test Page' });
});

module.exports = router;
