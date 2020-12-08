var express = require('express');
var router = express.Router();
var {
  Course,
  User,
  Place
} =  require ('../models')

var testRouter = require('./test');
var apiRouter = require('./api');
router.use('/test', testRouter);
router.use('/api', apiRouter);

/* GET home page. */
router.get('/', async function(req, res, next) {
  const course = await Course.findAll();
  console.log(course);

  res.render('home', { 
    title: 'TUCE',
    data: {
      courseList: course,
    }
  });
});


router.get('/course/:courseId', async function(req, res, next) {
  const courseId = req.params.courseId;

  // TODO: get userid from session
  const userId = 1;

  const course = await Course.findOne({
    where: {
      CourseId: courseId
    },
    include:[
      {
        model: Place,
      },
      {
        model: User,
        attributes: ['UserId', 'UserName'],
      }
    ]
  });
  console.log(course);

  res.render('course', { 
    title: 'TUCE',
    data: {
      courseId: course.CourseId,
      courseName: course.CourseName,
      courseList: course.Places,
      creater: course.User,
      editable: userId == course.User.UserId? true: false
    } 
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'TUCE' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'TUCE' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'TUCE' });
});

module.exports = router;
