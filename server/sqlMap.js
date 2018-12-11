// sql语句
const sqlMap = {
  // 用户
  user: {
    add: 'insert into user(userName, sex, age, tel) values (?, ?, ?, ?)',
    query: 'SELECT * FROM `vue_data`.`user` ORDER BY `id`',
    delete: 'delete from user where id = ?',
    update: 'update user set userName= ?, sex= ?, age= ?, tel= ? where id = ?',
  }
}
module.exports = sqlMap;
