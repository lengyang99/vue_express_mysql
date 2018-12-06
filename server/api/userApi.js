var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
const conn = mysql.createConnection(models.mysql);

conn.connect();

const responeResult = (err, res, result) =>{
  if (err) {
    return res.json({code:0,message:'erro',data:err});
  }else if (result) {
    return res.json({code:1,message:'success',data:result});
  }else{
    return res.json({code:2,message:'erro',data:result});
  }
}
// // 增加用户接口
router.post('/addUser', (req, res) => {
  const sql = $sql.user.add;
  const params = req.body;
  conn.query(sql, [params.username, params.age], function(err, result) {
        responeResult(err, res, result);
  })
});

// 增加用户接口
router.get('/getUser', (_, res) => {
  const sql = $sql.user.query;
  conn.query(sql,(err, result) => {
    responeResult(err, res, result);
  })
});

module.exports = router;
