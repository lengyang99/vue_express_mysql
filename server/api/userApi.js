var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
const conn = mysql.createConnection(models.mysql);

conn.connect();

const responeResult = (err, res, result) => {
  if (err) {
    console.log(err);
    return res.json({
      code: 0,
      message: 'erro',
      data: err
    });
  } else if (result) {
    return res.json({
      code: 1,
      message: 'success',
      data: result
    });
  } else {
    return res.json({
      code: 2,
      message: 'erro',
      data: result
    });
  }
}
// 增加用户
router.post('/addUser', (req, res) => {
  const sql = $sql.user.add;
  const params = req.body;
  conn.query(sql, [params.userName, params.sex, params.age, params.tel], function (err, result) {
    responeResult(err, res, result);
  })
});
router.get('/getUserByParams', (req, res) => {
  let sql = 'SELECT * FROM `vue_data`.`user` WHERE ';
  const params = req.query || [];
  for (let [key, value] of Object.entries(params)) {
    if (value && value !== '') {
      sql += `${sql.endsWith('WHERE ') ? '' : ' AND '}${key}${key === 'userName'? ` LIKE '%${value}%' ` : `='${value}'`}`;
    }
  }
  if (sql.endsWith('WHERE ')) {
    sql = $sql.user.query;
  }
  conn.query(sql, function (err, result) {
    responeResult(err, res, result);
  })
});
// 修改用户
router.post('/updateUser', (req, res) => {
  const sql = $sql.user.update;
  const params = req.body;
  conn.query(sql, [params.userName, params.sex, params.age, params.tel, params.id], function (err, result) {
    responeResult(err, res, result);
  })
});

// 查询用户
router.get('/getUser', (_, res) => {
  const sql = $sql.user.query;
  conn.query(sql, (err, result) => {
    responeResult(err, res, result);
  })
});

// 删除用户
router.get('/delUser', (req, res) => {
  const sql = $sql.user.delete;
  const params = req.query;
  conn.query(sql, [params.id], (err, result) => {
    console.log(params.id)
    responeResult(err, res, result);
  })
});
// 批量删除用户
router.get('/delMoreUser', (req, res) => {
  const params = req.query;
  let sql = `DELETE FROM  vue_data.user WHERE id IN (${params.ids})`;
  conn.query(sql, (err, result) => {
    responeResult(err, res, result);
  })
});

module.exports = router;
