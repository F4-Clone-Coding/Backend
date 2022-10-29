const mysql = require('mysql2');

const con = mysql.createConnection({
  host: "express-database.cppleqzzj919.ap-northeast-2.rds.amazonaws.com",
  user: "zin354",
  password: "10091011",
  database: "hanghaeweek7"
});

const obj = { 메뉴:"도쿄롤",  price: 65000, 장소:"종로3가" };
  // 객체를 JSON 포맷의 문자열로 변환합니다.
  const json = JSON.stringify(obj);
  
  // JSON 포맷의 문자열을 객체로 변환합니다.
  const parsed = JSON.parse(json);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = `INSERT INTO Orders (records) VALUES ('${json}')`;
  const values = json
 
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});