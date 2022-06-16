var express = require('express');
var router = express.Router();

const mysql = require('mysql2/promise');
const connInfo = require('./db/mysql_info').dev;
const conn = mysql.createPool(connInfo);

/* GET home page. */
router.get('/', async function(req, res, next) {
	let category = 1; // 전체
	let startingNo = 0;
	let id = 1;
	
	let data = await loadData(category, startingNo);
	console.log(data[1])
	
	//data[0]이 true 면... false 면...
	
	res.render('index.ejs', {"data": data[1] });
});

router.post('/loadMore', async function(req, res) {
	let category = req.body.cateogry;
	let startingNo = req.body.startingNo;
	let id = req.params.id;
	
	let results = await loadData(category, startingNo);
	
	let data = results[1];
	res.json(
		{"data": data}
	)
});




const loadData = async (category, startingNo) => {	
	try {
		const connection = await conn.getConnection(async conn=>conn);
		try {
			await connection.beginTransaction();

			// query 생성
			var select_query = "SELECT name, price1, donate, CONVERT(image1 USING utf8) AS image1 FROM test_table ORDER BY `id` DESC LIMIT " + startingNo + ",4";
			console.log(select_query)
			
			// console.log(insert_query);

			// query를 mysql에 입력하기
			let tmp = [];
			[tmp] = await connection.query(select_query);

			await connection.commit();
			connection.release();

			console.log("successfully saved!");
			return [true, tmp];
			}
			catch(err) {
				await connection.rollback();
				connection.release();
				console.log("[DB input error in <saveData> function] " + err);
				return false;
			}
	}
		catch(err) {
			console.log("[DB connection error in <saveData> function] " + err);
			return false;
		}
	}


module.exports = router;
