var express = require('express');
var fs = require('fs');
var router = express.Router();
var {
  Course,
  User,
  Place
} =  require ('../../models')

router.post('/course', async function(req, res, next) {
  // TODO: session check
  // match course creater id == sesion.userId
  const courseId = req.body.courseId
  const courseName = req.body.courseName
  const list = JSON.parse(req.body.list)

  // TODO: get userid from session
  const user = await User.findOne({
    where: {
      AccountId: req.session.accountId,
    },
  });

  const course = await Course.findOne({
    where: {
      CreaterId: user.UserId,
      CourseId: courseId,
    }
  })
  if(course){
    course.CourseName = courseName;
    await course.save();
    await Place.destroy({
      where: {
        CourseId: courseId
      }
    });
  
    list.forEach(async (e, i)=> {
      const place = await Place.create({
        PlaceName: e.PlaceName,
        Idx: i,
        Lat: e.Lat,
        Lng: e.Lng,
      })
      place.setCourse(courseId)
  
    });
  
    res.status(201).send('success');
  }else{
    res.status(401).send('fail. Course not exist, or not owned.');

  }
  
});


router.delete('/course', async function(req, res, next) {
  const courseId = req.body.courseId

  const user = await User.findOne({
    where: {
      AccountId: req.session.accountId,
    },
  });
  const course = await Course.findOne({
    where: {
      CreaterId: user.UserId,
      CourseId: courseId,
    }
  })
  if(course){
    await course.destroy();
    req.session.valid = true;
    res.redirect('/');
  }else{
    res.status(401).send('fail. Course not exist, or not owned.');
  }
})

router.post('/courseimage', async function(req, res, next) {
  const courseId = req.body.courseId
  const ext = req.body.ext
  const fileStream = req.body.files

  const user = await User.findOne({
    where: {
      AccountId: req.session.accountId,
    },
  });
  const course = await Course.findOne({
    where: {
      CreaterId: user.UserId,
      CourseId: courseId,
    }
  })
  if(course){
    const fileName = 'public/thumbnail/n_' + courseId+'.' + ext
    course.ThumbnailFileName = fileName.split('/')[fileName.split('/').length - 1]
    await course.save()
    var outF = fs.createWriteStream(fileName, {flags:'w'});
    fileStream.pipe(outF).on("finish", () => {
      res.status(200).send('success')

    }); 
    // fileStream.on('finish', function () {
    //   console.log('end')
    //   res.status(200);
    // });
    
    

  }else{
    res.status(401).send('fail. Course not exist, or not owned.');
  }

  
  
  

})

// /* GET home page. */
// router.get('/course/number/:number', async function(req, res, next) {
//   req.params.productId

  
//   const course = await Course.fundAll({
//     where: {
//       CourseId: courseId
//     }
//   });

//   res.status(201).json(course.str);
// });

module.exports = router;
