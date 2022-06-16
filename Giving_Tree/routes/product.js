var express = require('express');
var router = express.Router();

const mysql = require('mysql2/promise');
const connInfo = require('./db/mysql_info').dev;
const conn = mysql.createPool(connInfo);

/* GET home page. */
router.get('/:id', async function(req, res, next) {
	let id = req.params.id;
	// console.log(id)
	
	let results = await loadData(id);
	// console.log(results);
	
	res.render('product.ejs', { data: results[1]});
});



const loadData = async (id) => {	
	try {
		const connection = await conn.getConnection(async conn=>conn);
		try {
			await connection.beginTransaction();

			// query 생성
			var select_query = "SELECT id, name, description, CONVERT (image1 USING utf8) AS image1, CONVERT (image2 USING utf8) AS image2, CONVERT (image3 USING utf8) AS image3, size1, size2, size3, status1, status2, status3, status4, status5, status6, donate, price1 FROM test_table WHERE id='" + id + "'";
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