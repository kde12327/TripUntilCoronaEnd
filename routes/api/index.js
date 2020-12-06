var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/course', function(req, res, next) {
  const list = JSON.parse(req.body.list)

  res.status(201).send('success');
});

module.exports = router;