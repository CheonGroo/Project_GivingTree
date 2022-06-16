var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login.ejs');
});

router.post('/update', async function(req, res) {
	// step 2. ajax에서 보낸 값을 받아옴
	let email = req.body.email;
	let pw1 = req.body.pw1;
	console.log(email); // aaa

	// step 3. back-end에서 필요한 계산을 함
	let results = await loadData(email, pw1);
	
	
	// step 4. front-end로 결과값을 돌려보냄 (return)
	res.json({
		"message": "returned",
		"data": score
	});
});
module.exports = router;