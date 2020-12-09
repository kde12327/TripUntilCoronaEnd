var express = require('express');
var router = express.Router();

var models = require("../models");

var testRouter = require('./test');
var apiRouter = require('./api');
const User = require('../models/User');
router.use('/test', testRouter);
router.use('/api', apiRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'TUCE' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'TUCE' });
});

router.get('/login',function(req,res,next){
  var sess = req.session;
  
  res.render('login',{title:'TUCE'});
})
router.post('/login', function(req, res, next) {
  var reqUsername = req.body.username;
  var reqPassword= req.body.password;
  console.log(reqUsername,reqPassword);

  models.User.findOne({where: {UserName: reqUsername}})
    .then(function(data){
      if( models.User.accountPassword != reqPassword) {
        var data = {success:false, msg:'로그인 정보 오류'};
        res.json(data);
      }else{
        var sess = req.session;
        sess.username= reqUsername;
      }
    })
});

router.get("/register", function(req,res,next){
  res.render('register',{ title: 'TUCE' });
});

router.post("/register", function(req,res) {
  console.log(req.body.password);
  models.User.findOne({where:{accountId: req.body.email}})
      .then(function(data){
          if((data==null || data == undefined) ===false ){
            req.session.message = '세션 메시지';
            req.flash('message', 'flash 메시지');
          }
          models.User
              .create({UserName:req.body.username,
                      accountId:req.body.email,
                      accountPassword:req.body.password
              })
              .then(function(createUserCore){
                  res.render('home',{title:"TUCE"});
              });
      });
});

module.exports = router;
