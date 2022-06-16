var express = require('express');
var router = express.Router();


/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('story', { data: "21번째 기부 내역 페이지입니다."});
});

router.get('/22', function(req, res, next) {
  res.render('story_22', { data: "22번째 기부 내역 페이지입니다."});
});

router.get('/23', function(req, res, next) {
  res.render('story_23', { data: "23번째 기부 내역 페이지입니다."});
});


module.exports = router;
