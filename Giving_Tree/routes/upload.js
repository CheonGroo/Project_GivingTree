var express = require('express');
var router = express.Router();

const mysql = require('mysql2/promise');
const connInfo = require('./db/mysql_info').dev;
const conn = mysql.createPool(connInfo);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('upload.ejs', { data: "upload 페이지입니다."});
});

router.post('/upload', async function(req, res, next) {
	let data = {
		"name": req.body.name,
		"description": req.body.description,
		"image1": req.body.image1,
		"image2": req.body.image2,
		"image3": req.body.image3,
		"donate": parseInt(req.body.donate),
		"size1": req.body.size1,
		"size2": parseInt(req.body.size2),
		"size3": parseInt(req.body.size3),
		"status1": parseInt(req.body.status1),
		"status2": parseInt(req.body.status2),
		"status3": parseInt(req.body.status3),
		"status4": parseInt(req.body.status4),
		"status5": parseInt(req.body.status5),
		"status6": parseInt(req.body.status6),
		"price1": parseInt(req.body.price1),
	};
	
	console.log(req.body.status);
	
	let results = await saveData(data);
	
	let flag;
	if (results) flag = 1;
	else flag = 0;
	
	res.json({
		'message': 'returned',
		'flag': flag
	})
	
});


const saveData = async (data) => {	
	try {
		const connection = await conn.getConnection(async conn=>conn);
		try {
			await connection.beginTransaction();
			
			// query 생성
			let insert_query = "INSERT INTO test_table (name, description, image1, image2, image3, size1, size2, size3, status1, status2, status3, status4, status5, status6, donate, price1) VALUES ('" 
		   + data.name + "','" 
		   + data.description + "','" 
		   + data.image1 + "','" 
		   + data.image2 + "','" 
		   + data.image3 + "','" 
		   + data.size1 + "','" 
		   + data.size2 + "','" 
		   + data.size3 + "','" 
		   + data.status1 + "','" 
		   + data.status2 + "','" 
		   + data.status3 + "','" 
		   + data.status4 + "','" 
		   + data.status5 + "','" 
		   + data.status6 + "','"
		   + data.donate + "','"
		   + data.price1 + "')";
			console.log(insert_query);
			
			// query를 mysql에 입력하기
			await connection.query(insert_query);
			
			await connection.commit();
			connection.release();

			console.log("successfully saved!")
			return true;
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