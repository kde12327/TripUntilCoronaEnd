var express = require('express');
var router = express.Router();
var {
  Course,
  User,
  Place
} =  require ('../../models')

router.post('/course', async function(req, res, next) {
  // TODO: session check
  // match course creater id == sesion.userId
  const courseId = JSON.parse(req.body.courseId)
  const list = JSON.parse(req.body.list)

  
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
});

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