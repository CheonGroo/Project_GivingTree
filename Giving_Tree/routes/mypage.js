var express = require('express');
var router = express.Router();

/* GET my page. */
router.get('/', function(req, res, next) {
  res.render('mypage.ejs', { data: "마이페이지입니다."});
});



module.exports = router;