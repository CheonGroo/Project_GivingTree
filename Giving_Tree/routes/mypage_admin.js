var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('mypage_admin.ejs', { data: "관리자용 마이페이지입니다."});
});



module.exports = router;