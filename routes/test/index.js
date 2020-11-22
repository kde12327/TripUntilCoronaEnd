var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/1', function(req, res, next) {
  res.render('test', { 
    title: 'Test Page', 
    data: {
      course_title: '코스 명',
      course_list: [
        {
          courseItemName: '1번',
        },
        {
          courseItemName: '2번',
        },
        {
          courseItemName: '3번',
        }
      ]
    } 
  });
});

/* GET home page. */
router.get('/2', function(req, res, next) {
  res.render('test2', { title: 'Test Page' });
});

module.exports = router;
