var express = require('express');
var router = express.Router();
var {
  Course,
  User,
  Place
} =  require ('../../models')

/* GET home page. */
router.post('/course', async function(req, res, next) {
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

module.exports = router;