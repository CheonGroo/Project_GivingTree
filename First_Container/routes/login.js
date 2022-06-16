var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login.ejs', { data: "login 페이지입니다."});
});



module.exports = router;