var express = require('express');
var session =require('express-session');
var router = express.Router();
var {
  Course,
  User,
  Place
} =  require ('../models')

var models = require("../models");

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
    , session: req.session
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
    } , 
    session: req.session
  });
});

router.get('/newcourse', async function(req, res, next) {
  // TODO: session check
  const userId = 1;
  // req.session.valid = true;
  const course = await Course.create({
    CourseName: '코스명',
    CreaterId: userId,
  })
  const place = await Place.create({
    PlaceName: '장소명',
    Idx: 0,
    Lat: '37.5760034',
    Lng: '126.9769167',
  })
  place.setCourse(course.CourseId)


  res.redirect('/course/'+course.CourseId);
});
router.get('/about', function(req, res, next) {
  
  res.render('about', { title: 'TUCE' ,session: req.session});
});

router.get('/login',function(req,res,next){
  
  res.render('login',{
    title:'TUCE',
    session: req.session
  });
})
router.post('/login', async function(req, res, next) {
  const result = await models.User.findOne({where:{accountId: req.body.accountId}});

  if(result !== null && result.accountId === req.body.accountId){
    req.session.accountId = req.body.accountId
    res.render('about', { title: 'TUCE' ,session: req.session});
  }else{
    res.render('login',{
      title:'TUCE',
      session: req.session
    });
  }

  models.User.findOne({where:{accountId: req.body.accountId}})
});

router.get("/register", function(req,res,next){
  res.render('register',{ title: 'TUCE' ,session: req.session});
});

router.post("/register", async function(req,res) {
  console.log(req.body.password);
  const result = await models.User.findOne({where:{accountId: req.body.accountId}})
              
      if(result.accountId==null){
            models.User
                .create({UserName:req.body.username,
                accountId:req.body.accountId,
                accountPassword:req.body.password
        })
              .then(
                req.session.accountId = req.body.accountId
              )
              .then(
                console.log("확인"+req.session.accountId)
              )
              .then(
                res.render('about', { title: 'TUCE', session: req.session })
              )
            }else{
              res.render('register',{ title: 'TUCE' , session: req.session});
            }
            
      });

      router.get("/logout",function(req,res,next){
        req.session.destroy();
        res.clearCookie('secret');
      
        res.redirect("/login")})


module.exports = router;
