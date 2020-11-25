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
          courseItemName: '서울과기대 정문',
          lat: 37.63014756196891,
          lng: 127.0763783269148,
        },
        {
          courseItemName: '공릉역',
          lat: 37.62532966688715,
          lng: 127.0731935783579,
        },
        {
          courseItemName: '하계역',
          lat: 37.63594705616194,
          lng: 127.0684599110117,
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
