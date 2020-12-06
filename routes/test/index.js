var express = require('express');
var router = express.Router();
var {
  Course,
  User,
  Place
} =  require ('../../models')
/* GET home page. */
router.get('/1', async function(req, res, next) {

  const course = await Course.findOne({
    where: {
      CreaterId: 1
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
  })
  console.log(eval('(' + JSON.stringify(course)+ ')'))

  res.render('test', { 
    title: 'Test Page', 
    data: {
      courseId: course.CourseId,
      courseName: course.CourseName,
      courseList: course.Places,
      creater: course.User
    } 
  });
});

/* GET home page. */
router.get('/2', function(req, res, next) {
  res.render('test2', { title: 'Test Page' });
});

module.exports = router;
